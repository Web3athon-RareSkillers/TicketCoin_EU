import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text, Vibration} from 'react-native';
import RoundedButton from '../components/roundedButton';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {PERMISSIONS, RESULTS, request} from 'react-native-permissions';

export default function Scanner({emitScanState}) {
  const [scanResult, setScanResult] = useState(null);
  const [isScannerActive, setIsScannerActive] = useState(true);

  useEffect(() => {
    requestCameraPermission();
    // Vibration permission is not needed on Android, so we just use it.
    // For iOS, you need to add a description for the vibration permission in Info.plist.
    if (Platform.OS === 'ios') {
      Vibration.vibrate();
    }
  }, []);

  async function requestCameraPermission() {
    try {
      const cameraPermission = Platform.select({
        android: PERMISSIONS.ANDROID.CAMERA,
        ios: PERMISSIONS.IOS.CAMERA,
      });

      const res = await request(cameraPermission);

      if (res === RESULTS.GRANTED) {
        console.log('You can use the camera');
      } else {
        console.log('Camera permission denied');
      }
    } catch (error) {
      console.log('Camera permission error:', error);
    }
  }

  function handleBarCodeScanned({type, data}) {
    if (data) {
      setScanResult({success: true, data});
      emitScanState(true);
      setIsScannerActive(false);
      Vibration.vibrate(100);
    } else {
      setScanResult({success: false});
      emitScanState(false);
      setIsScannerActive(false);
      Vibration.vibrate(500, true);
    }
  }

  function reactivateScanner() {
    setIsScannerActive(true);
    setScanResult(null);
    emitScanState(false);
  }

  return (
    <View style={styles.container}>
      {isScannerActive ? (
        <QRCodeScanner
          onRead={handleBarCodeScanned}
          showMarker={true}
          cameraStyle={styles.cameraContainer}
        />
      ) : null}
      {scanResult ? (
        <Text
          style={scanResult.success ? styles.successText : styles.errorText}>
          {scanResult.success
            ? `Success! Data: ${scanResult.data}`
            : 'Scan not successful'}
        </Text>
      ) : null}
      <View style={styles.buttonContainer}>
        <RoundedButton
          retryIcon={true}
          title="Scan Again"
          onPress={reactivateScanner}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  cameraContainer: {
    maxHeight: 180,
    width: '80%',
    marginHorizontal: '10%',
  },
  successText: {
    color: 'green',
    textAlign: 'center',
    fontSize: 20,
    margin: 10,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    fontSize: 20,
    margin: 10,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 120,
    left: '25%',
    width: '50%',
    height: 52,
  },
});
