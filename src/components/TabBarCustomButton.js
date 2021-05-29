import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

const TabBarCustomButton = ({ children, onPress }) => {
  const tab = useSelector((state) => state.tab)
  const { isTradeModalVisible } = tab;
  return (
    <TouchableOpacity
      style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
      onPress={onPress}>
      {children}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({});

export default TabBarCustomButton;
