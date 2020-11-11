import { Divider, List, ListItem } from '@ui-kitten/components';
import React, { useCallback, useMemo, useRef } from 'react';
import {
 SafeAreaView, StyleSheet, Text, View 
} from 'react-native';
import Modal from 'react-native-modal';

import Navbar from '../../components/Navbar';
import T from '../../components/Transliteration';
import { RootStackComponent } from '../../typings/routing';
import LanguageBottomSheet from './components/LanguageBottomSheet';
import { useSettingsList } from './Model';
import { IItem } from './types';

const Settings: RootStackComponent<'Settings'> = () => {
  const bottomSheetRef = useRef<Modal | null>();
  const [settingsList] = useSettingsList(bottomSheetRef);
  const renderItem = ({ item }: { item: IItem }) => (
    <ListItem
      key={item.label}
      accessoryLeft={() => item.icon}
      title={item.label}
      onPress={item.onPress}
    />
  );

  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

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
      <LanguageBottomSheet>
        {(ref: Modal | null) => {
          bottomSheetRef.current = ref;
          return (
            <View>
              <Text>Body</Text>
            </View>
          );
        }}
      </LanguageBottomSheet>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default Settings;
