import { Divider, List, ListItem } from '@ui-kitten/components';
import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';

import Navbar from '../../components/Navbar';
import T from '../../components/Transliteration';
import { RootStackComponent } from '../../typings/routing';
import { generateSettingsList } from './Model';
import { IItem } from './types';

const Settings: RootStackComponent<'Settings'> = () => {
  const [settingsList] = generateSettingsList();

  const renderItem = ({ item }: { item: IItem }) => (
    <ListItem
      key={item.label}
      accessoryLeft={() => item.icon}
      title={item.label}
      onPress={item.onPress}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <Navbar title={<T name="SETTINGS_PAGE_TITLE" />} showActions={false} />
      <List
        alwaysBounceVertical={false}
        style={styles.container}
        data={settingsList}
        ItemSeparatorComponent={Divider}
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default Settings;
