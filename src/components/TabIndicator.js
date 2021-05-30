import React, {createRef} from 'react'
import { Text, View, Animated } from 'react-native';
import { COLORS, FONTS, SIZES, constants } from '../constants';

const marketTabs = constants.marketTabs.map((marketTab) => ({
  ...marketTab,
  ref: createRef(),
}));

const TabIndicator = ({ measureLayout, scrollX }) => {
    const inputRange = marketTabs.map((_, i) => i * SIZES.width)

    const translateX = scrollX.interpolate({
        inputRange,
        outputRange: measureLayout.map(measure => measure.x)
    })
    return (
        <Animated.View style={{
            position: 'absolute',
            left: 0,
            height: '100%',
            width: (SIZES.width - (SIZES.radius * 2)) / 2,
            borderRadius: SIZES.radius,
            backgroundColor: COLORS.lightGray,
            transform: [{translateX}]
        }}>
            <Text></Text>
        </Animated.View>
    )
}

export default TabIndicator


