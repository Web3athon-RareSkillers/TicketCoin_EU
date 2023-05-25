import {PublicKey} from '@solana/web3.js';
import {toUint8Array} from 'js-base64';
import {useState, useCallback, useMemo} from 'react';
import React from 'react';

function getAccountFromAuthorizedAccount(account) {
  return {
    ...account,
    publicKey: getPublicKeyFromAddress(account.address),
  };
}
function getAuthorizationFromAuthorizationResult(
  authorizationResult,
  previouslySelectedAccount,
) {
  let selectedAccount;
  if (
    // We have yet to select an account.
    previouslySelectedAccount == null ||
    // The previously selected account is no longer in the set of authorized addresses.
    !authorizationResult.accounts.some(
      ({address}) => address === previouslySelectedAccount.address,
    )
  ) {
    const firstAccount = authorizationResult.accounts[0];
    selectedAccount = getAccountFromAuthorizedAccount(firstAccount);
  } else {
    selectedAccount = previouslySelectedAccount;
  }
  return {
    accounts: authorizationResult.accounts.map(getAccountFromAuthorizedAccount),
    authToken: authorizationResult.auth_token,
    selectedAccount,
  };
}

function getPublicKeyFromAddress(address) {
  const publicKeyByteArray = toUint8Array(address);
  return new PublicKey(publicKeyByteArray);
}

export const APP_IDENTITY = {
  name: 'Ticket Coin',
  uri: 'https://www.ticketcoin.com',
};

const AuthorizationContext = React.createContext({
  accounts: null,
  authorizeSession: _wallet => {
    throw new Error('AuthorizationProvider not initialized');
  },
  deauthorizeSession: _wallet => {
    throw new Error('AuthorizationProvider not initialized');
  },
  onChangeAccount: _nextSelectedAccount => {
    throw new Error('AuthorizationProvider not initialized');
  },
  selectedAccount: null,
});

function AuthorizationProvider(props) {
  const {children} = props;
  const [authorization, setAuthorization] = useState(null);
  const handleAuthorizationResult = useCallback(
    async authorizationResult => {
      const nextAuthorization = getAuthorizationFromAuthorizationResult(
        authorizationResult,
        authorization?.selectedAccount,
      );
      await setAuthorization(nextAuthorization);
      return nextAuthorization;
    },
    [authorization, setAuthorization],
  );
  const authorizeSession = useCallback(
    async wallet => {
      const authorizationResult = await (authorization
        ? wallet.reauthorize({
            auth_token: authorization.authToken,
            identity: APP_IDENTITY,
          })
        : wallet.authorize({
            cluster: 'mainnet-beta',
            identity: APP_IDENTITY,
          }));
      return (await handleAuthorizationResult(authorizationResult))
        .selectedAccount;
    },
    [authorization, handleAuthorizationResult],
  );
  const deauthorizeSession = useCallback(
    async wallet => {
      if (authorization?.authToken == null) {
        return;
      }
      await wallet.deauthorize({auth_token: authorization.authToken});
      setAuthorization(null);
    },
    [authorization, setAuthorization],
  );
  const onChangeAccount = useCallback(
    nextSelectedAccount => {
      setAuthorization(currentAuthorization => {
        if (
          !currentAuthorization?.accounts.some(
            ({address}) => address === nextSelectedAccount.address,
          )
        ) {
          throw new Error(
            `${nextSelectedAccount.address} is not one of the available addresses`,
          );
        }
        return {
          ...currentAuthorization,
          selectedAccount: nextSelectedAccount,
        };
      });
    },
    [setAuthorization],
  );
  const value = useMemo(
    () => ({
      accounts: authorization?.accounts ?? null,
      authorizeSession,
      deauthorizeSession,
      onChangeAccount,
      selectedAccount: authorization?.selectedAccount ?? null,
    }),
    [authorization, authorizeSession, deauthorizeSession, onChangeAccount],
  );

  return (
    <AuthorizationContext.Provider value={value}>
      {children}
    </AuthorizationContext.Provider>
  );
}

const useAuthorization = () => React.useContext(AuthorizationContext);

export {AuthorizationProvider, useAuthorization};
