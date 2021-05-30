import React from 'react'
import { StyleSheet, Text, View } from 'react-native';
import { COLORS, SIZES, FONTS} from '../constants';

const HeaderBar = ({title}) => {
    return (
        <View style={{
            height: 100,
            paddingHorizontal: SIZES.radius,
            justifyContent: 'flex-end'
        }}>
            <Text style={{ ...FONTS.largeTitle, color: COLORS.white }}>{title}</Text>
        </View>
    )
}

const styles = StyleSheet.create({})

export default HeaderBar;

