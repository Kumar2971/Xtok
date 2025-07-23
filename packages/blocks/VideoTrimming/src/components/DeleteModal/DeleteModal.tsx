import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {PropsWithChildren, ReactElement} from 'react';
import {ReactNativeModal} from 'react-native-modal';
import FONTS from '../../../../../components/src/Fonts/Fonts';
import Scale from '../../../../../components/src/Scale';

export function DeleteModal(
  props: PropsWithChildren<DeleteModalProps>,
): ReactElement {
  const {
    isVisible,
    onDelete,
    onCancel,
    label,
    primaryLabel,
    secondaryLabel,
  } = props;

  return (
    <ReactNativeModal
      isVisible={isVisible}
      backdropOpacity={0.5}
      style={styles.deleteModalContainer}
    >
      <View style={styles.deleteModal}>
        <Text style={styles.titleModal}>{label}</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.buttonModal, styles.secondaryButtonModal]}
            onPress={onCancel}
          >
            <Text style={styles.labelButtonModal}>
              {secondaryLabel ? secondaryLabel : 'Cancel'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.buttonModal} onPress={onDelete}>
            <Text style={styles.labelButtonModal}>
              {primaryLabel ? primaryLabel : 'Delete'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ReactNativeModal>
  );
}

const styles = StyleSheet.create({
  deleteModalContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteModal: {
    backgroundColor: 'white',
    borderRadius: 10,
    width: '90%',
    padding: 16,
    alignItems: 'center',
  },
  titleModal: {
    fontSize: 15,
    fontFamily: FONTS.MontserratSemiBold,
    fontWeight: '500',
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '90%',
    marginTop: Scale(32),
  },
  buttonModal: {
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
    width: Scale(120),
    backgroundColor: '#ffd420',
    borderRadius: 100,
  },
  secondaryButtonModal: {
    backgroundColor: '#fff6d2',
  },
  labelButtonModal: {
    fontSize: 14,
    fontFamily: FONTS.MontserratSemiBold,
    fontWeight: '500',
    textAlign: 'center',
  },
});

export interface DeleteModalProps {
  isVisible: boolean;
  onDelete: () => void;
  onCancel: () => void;
  label?: string;
  primaryLabel?: string;
  secondaryLabel?: string;
  testID?:string
}

DeleteModal.defaultProps = {};

export default DeleteModal;
