import { StatusBar } from 'expo-status-bar';
import { Provider as ReduxProvider } from 'react-redux';

import { StyleSheet, Text, View } from 'react-native';
import { store } from './store/root.store';
import React from 'react';

export function Main() {
    return (
        <ReduxProvider store={store}>
            <View style={styles.container}>
                <Text>Open up App.tsx to start working on your app!</Text>
                <StatusBar style="auto" />
            </View>
        </ReduxProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
