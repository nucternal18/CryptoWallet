import React, { useCallback } from 'react';
import { View, Text } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { MainLayout } from './index';
import { getHoldings, getCoinMarket } from '../stores/market/marketActions';
import { COLORS, SIZES, FONTS, dummyData, icons } from '../constants';
import { BalanceInfo, IconTextButton } from '../components';

const Home = () => {
  const dispatch = useDispatch();
  const market = useSelector((state) => state.market);
  const { myHoldings, coins, error } = market;

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
  console.log(totalWallet);
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
        {/* Top Cryptocurrency */}
      </View>
    </MainLayout>
  );
};

export default Home;
