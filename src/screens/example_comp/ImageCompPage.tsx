import React, {useState} from 'react';
import {ScrollView, Text, StyleSheet} from 'react-native';

function TextCompPage(): JSX.Element {
  return (
    <ScrollView>
      <Text style={styles.container}>滑动列表</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container:{
    padding:16,
    backgroudColor:'#ffffff'
  }
})
