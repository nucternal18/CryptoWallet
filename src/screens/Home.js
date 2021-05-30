import React, { useCallback, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { MainLayout } from './index';
import { getHoldings, getCoinMarket } from '../stores/market/marketActions';
import { COLORS, SIZES, FONTS, dummyData, icons } from '../constants';
import { BalanceInfo, IconTextButton, Chart } from '../components';

const Home = () => {
  const dispatch = useDispatch();
  const market = useSelector((state) => state.market);
  const { myHoldings, coins, error } = market;
  const [selectedCoin, setSelectedCoin] = useState(null)

  // console.log(error)
  // console.log('MY HOLDINGS ->> ', myHoldings);
  // console.log(coins);
  useFocusEffect(
    useCallback(() => {
      dispatch(getHoldings((holdings = dummyData.holdings)));
      dispatch(getCoinMarket());
    }, [])
  );

  let totalWallet = myHoldings.reduce((a, b) => a + (b.total || 0), 0);
  let valueChange = myHoldings.reduce(
    (a, b) => a + (b.holding_value_change_7d || 0),
    0
  );
  let percChange = (valueChange / (totalWallet - valueChange)) * 100;

  function renderWalletInfoSection() {
    return (
      <View
        style={{
          paddingHorizontal: SIZES.padding,
          borderBottomLeftRadius: 25,
          borderBottomRightRadius: 25,
          backgroundColor: COLORS.gray,
        }}>
        {/* Balance info section */}
        <BalanceInfo
          title='Your Wallet'
          displayAmount={totalWallet}
          changePct={percChange}
          containerStyle={{ marginTop: 50 }}
        />
        {/* Buttons */}
        <View
          style={{
            flexDirection: 'row',
            marginTop: 30,
            marginBottom: -15,
            paddingHorizontal: SIZES.radius,
          }}>
          <IconTextButton
            label='Transfer'
            icon={icons.send}
            containerStyle={{ flex: 1, height: 40, marginRight: SIZES.radius }}
            onPress={() => console.log('Transfer')}
          />
          <IconTextButton
            label='Withdraw'
            icon={icons.withdraw}
            containerStyle={{ flex: 1, height: 40 }}
            onPress={() => console.log('Withdraw')}
          />
        </View>
      </View>
    );
  }
  return (
    <MainLayout>
      <View style={{ flex: 1, backgroundColor: COLORS.black }}>
        {/* Header wallet info */}
        {renderWalletInfoSection()}
        {/* Chart */}
        <Chart
          containerStyle={{
            marginTop: SIZES.padding * 2,
          }}
          chartPrices={selectedCoin ? selectedCoin?.sparkline_in_7d?.price : coins[0]?.sparkline_in_7d?.price}
        />
        {/* Top Cryptocurrency */}
        <FlatList
          data={coins}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{
            marginTop: 30,
            paddingHorizontal: SIZES.padding,
          }}
          ListHeaderComponent={
            <View style={{ marginBottom: SIZES.radius }}>
              <Text style={{ color: COLORS.white, ...FONTS.h3, fontSize: 18 }}>
                Top CryptoCurrency
              </Text>
            </View>
          }
          renderItem={({ item }) => {
            let priceColor =
              item.price_change_percentage_7d_in_currency === 0
                ? COLORS.lightGray3
                : item.price_change_percentage_7d_in_currency > 0
                ? COLORS.lightGreen
                : COLORS.red;
            return (
              <TouchableOpacity
                style={{
                  height: 55,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onPress={() => setSelectedCoin(item)}
              >
                {/* Logo */}
                <View style={{ width: 35 }}>
                  <Image
                    source={{ uri: item.image }}
                    style={{ height: 20, width: 20 }}
                  />
                </View>
                {/* Name */}
                <View style={{ flex: 1 }}>
                  <Text style={{ color: COLORS.white, ...FONTS.h3 }}>
                    {item.name}
                  </Text>
                </View>
                {/* Figures */}
                <View>
                  <Text
                    style={{
                      textAlign: 'right',
                      color: COLORS.white,
                      ...FONTS.h4,
                    }}>
                    ${item.current_price}
                  </Text>
                  <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end'}}>
                    {item.price_change_percentage_7d_in_currency !== 0 && (
                      <Image
                        source={icons.upArrow}
                        style={{
                          height: 10,
                          width: 10,
                          tintColor: priceColor,
                          transform:
                            item.price_change_percentage_7d_in_currency > 0
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
                      {item.price_change_percentage_7d_in_currency.toFixed(2)}%
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          }}
          ListFooterComponent={
            <View style={{ marginBottom: 50}} />
          }
        />
      </View>
    </MainLayout>
  );
};

export default Home;
