import i18n from 'i18n-js';
import React from 'react';
import { Text } from 'react-native';

interface IProps {
  name: string;
}

const T: React.FC<IProps> = ({ name, ...rest }) => {
  return <Text {...rest}>{i18n.t(name)}</Text>;
};

export default T;
