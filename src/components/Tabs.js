import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { COLORS, FONTS } from '../constants';
import TabIndicator from './TabIndicator';

const Tabs = ({ marketTabs, scrollX, onMarketTabPress }) => {
  const [measureLayout, setMeasureLayout] = useState([])
  const containerRef = useRef()

  useEffect(() => {
    let ml = []
    marketTabs.forEach(market => {
      market.ref.current.measureLayout(
        containerRef.current,
        (x, y, width, height) => {
          ml.push({ x, y, width, height })

          if (ml.length === marketTabs.length) {
            setMeasureLayout(ml)
          }
        }
      )
    })
  }, [containerRef.current])
  return (
    <View ref={containerRef} style={{ flexDirection: 'row' }}>
      {/* Tab Indicator */}
      {measureLayout.length > 0 &&  <TabIndicator measureLayout={measureLayout} scrollX={scrollX} />}
      {marketTabs.map((item, index) => {
        return (
          <TouchableOpacity key={`MarketTab-${index}`} style={{ flex: 1 }} onPress={() => onMarketTabPress(index)}>
            <View
              ref={item.ref}
              style={{
                paddingHorizontal: 15,
                alignItems: 'center',
                justifyContent: 'center',
                height: 40,
                    }}>
                    <Text style={{ color: COLORS.white, ...FONTS.h3}}>{item.title}</Text>
              </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default Tabs;
