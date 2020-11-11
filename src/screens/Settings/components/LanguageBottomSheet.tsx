import { HeaderTitle } from '@react-navigation/stack';
import { Button, Icon } from '@ui-kitten/components';
import React, { useRef, useState } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import Modal from 'react-native-modal';

import { HeaderCollapseIndicator } from '../../../elements/HeaderCollapseIndicator';
import ModalBody from '../../../elements/ModalBody';
import commonStyles from '../../../theme/commonStyles';

const { width, height } = Dimensions.get('window');

interface IProps {}

const LanguageBottomSheet: React.FC<IProps> = ({ children }) => {
  const sheetRef = useRef<Modal | null>();

  // const close = () => {
  //   setIsOpen(false);
  // };
  // const open = () => {
  //   setIsOpen(true);
  // };

  return (
    <Modal
      // isVisible={isOpen}
      deviceWidth={width}
      deviceHeight={height}
      onBackdropPress={close}
      onSwipeComplete={close}
      swipeDirection="down"
      style={{ margin: 0 }}
      ref={(ref) => {
        sheetRef.current = ref;
      }}
    >
      <ModalBody height={0.85}>
        <View style={styles.modalHeader}>
          <HeaderCollapseIndicator />
          <Button
            appearance="ghost"
            style={styles.closeButton}
            onPress={close}
            accessoryLeft={() => (
              <Icon
                name="close-circle-outline"
                style={{ width: 27, height: 27 }}
                fill=""
              />
            )}
          />
          <HeaderTitle style={commonStyles.centerText}>Title</HeaderTitle>
          {children(sheetRef)}
        </View>
      </ModalBody>
    </Modal>
  );
};

const styles = StyleSheet.create({
  closeButton: {
    position: 'absolute',
    right: 8,
    top: -8,
  },
  modalHeader: {},
});

export default LanguageBottomSheet;
