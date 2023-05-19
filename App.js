import React from 'react';
import {View, Text} from 'react-native';
import AddressPicker from "./AddressPicker";

const App = () => {

    return (
        <View style={{flex: 1}}>
            <AddressPicker address={} onAddress={} onModalVisible={} />
        </View>
    );
};

export default App;

// useEffect(() => {
//     viewRef.current.measure(((left, top, width, height, pageX, pageY) => {
//         // ...
//     });
// }, []);