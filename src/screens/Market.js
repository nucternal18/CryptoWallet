import React, { useRef, useState, useEffect, createRef, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  Animated,
} from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { useDispatch, useSelector } from 'react-redux';
import { MainLayout } from './index';
import { getCoinMarket } from '../stores/market/marketActions';
import { COLORS, SIZES, FONTS, constants, icons } from '../constants';
import { Chart, HeaderBar, Tabs, TextButton } from '../components';

const marketTabs = constants.marketTabs.map((marketTab) => ({
  ...marketTab,
  ref: createRef(),
}));

const Market = () => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const marketTabScrollViewRef = useRef()

  const onMarketTabPress = useCallback(marketTabIndex => {
    marketTabScrollViewRef.current.scrollToOffset({
      offset: marketTabIndex * SIZES.width
    })
  })
  const dispatch = useDispatch();
  const market = useSelector((state) => state.market);
  const { coins } = market;
  const [selectedCoin, setSelectedCoin] = useState(null);

  useEffect(() => {
    dispatch(getCoinMarket());
  }, []);

  function renderTabBar() {
    return (
      <View
        style={{
          marginTop: SIZES.radius,
          marginHorizontal: SIZES.radius,
          borderRadius: SIZES.radius,
          backgroundColor: COLORS.gray,
        }}>
        <Tabs marketTabs={marketTabs} scrollX={scrollX} onMarketTabPress={onMarketTabPress} />
      </View>
    );
  }

  function renderButtons() {
    return (
      <View
        style={{
          flexDirection: 'row',
          marginTop: SIZES.radius,
          marginHorizontal: SIZES.radius,
        }}>
        <TextButton label='USD' />
        <TextButton
          label='% (7d)'
          containerStyle={{ marginLeft: SIZES.base }}
        />
        <TextButton label='Top' containerStyle={{ marginLeft: SIZES.base }} />
      </View>
    );
  }

  function renderList() {
    return (
      <Animated.FlatList
        ref={marketTabScrollViewRef}
        data={marketTabs}
        contentContainerStyle={{ marginTop: SIZES.padding }}
        horizontal
        pagingEnabled
        scrollEventThrottle={16}
        snapToAlignment='center'
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          {
            useNativeDriver: false,
          }
        )}
        renderItem={({ item, index }) => {
          return (
            <View
              style={{
                flex: 1,
                width: SIZES.width,
              }}>
              <FlatList
                data={coins}
                keyExtractor={(item) => item.id}
                renderItem={({ item, index }) => {
                  let priceColor =
                    item.price_change_percentage_7d_in_currency === 0
                      ? COLORS.lightGray3
                      : item.price_change_percentage_7d_in_currency > 0
                      ? COLORS.lightGreen
                      : COLORS.red;
                  return (
                    <View
                      style={{
                        flexDirection: 'row',
                        paddingHorizontal: SIZES.padding,
                        marginBottom: SIZES.radius,
                      }}>
                      {/* Coins */}
                      <View
                        style={{
                          flex: 1.5,
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}>
                        <Image
                          source={{ uri: item.image }}
                          style={{ height: 20, width: 20 }}
                        />
                        <Text
                          style={{
                            marginLeft: SIZES.padding,
                            color: COLORS.white,
                            ...FONTS.h4,
                          }}>
                          {item.name}
                        </Text>
                      </View>
                      {/* Line Chart */}
                      <View
                        style={{
                          flex: 1,
                          alignItems: 'center',
                        }}>
                        <LineChart
                          ithVerticalLabels={false}
                          withHorizontalLabels={false}
                          withDots={false}
                          withInnerLines={false}
                          withVerticalLines={false}
                          withOuterLines={false}
                          data={{
                            datasets: [
                              {
                                data: item.sparkline_in_7d.price,
                              },
                            ],
                          }}
                          width={100}
                          height={60}
                          chartConfig={{
                            color: () => priceColor,
                          }}
                          bezier
                          style={{
                            paddingRight: 0,
                          }}
                        />
                      </View>
                      {/* Figures */}
                      <View
                        style={{
                          flex: 1,
                          alignItems: 'flex-end',
                          justifyContent: 'center',
                        }}>
                        <Text style={{ color: COLORS.white, ...FONTS.h3 }}>
                          ${item?.current_price.toLocaleString()}
                        </Text>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'flex-end',
                          }}>
                          {item.price_change_percentage_7d_in_currency !==
                            0 && (
                            <Image
                              source={icons.upArrow}
                              style={{
                                height: 10,
                                width: 10,
                                tintColor: priceColor,
                                transform:
                                  item.price_change_percentage_7d_in_currency >
                                  0
                                    ? [{ rotate: '45deg' }]
                                    : [{ rotate: '125deg' }],
                              }}
                            />
                          )}
                          <Text
                            style={{
                              marginLeft: 5,
                              color: priceColor,
                              ...FONTS.body5,
                              lineHeight: 15,
                            }}>
                            {item.price_change_percentage_7d_in_currency.toFixed(
                              2
                            )}
                            %
                          </Text>
                        </View>
                      </View>
                    </View>
                  );
                }}
              />
              
            </View>
          );
        }}
      />
    );
  }

  return (
    <MainLayout>
      <View style={{ flex: 1, backgroundColor: COLORS.black }}>
        {/* Header */}
        <HeaderBar title='Market' />
        {/* Tab Bar */}
        {renderTabBar()}
        {/* Buttons */}
        {renderButtons()}
        {/* Market List */}
        {renderList()}
      </View>
    </MainLayout>
  );
};

export default Market;
