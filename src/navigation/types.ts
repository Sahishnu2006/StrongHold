import { NavigatorScreenParams } from '@react-navigation/native';
import { DocumentItem } from '../types';

export type MainTabParamList = {
  VaultHome: undefined;
  Assistant: undefined;
  Settings: undefined;
};

export type VaultStackParamList = {
  MainTabs: NavigatorScreenParams<MainTabParamList> | undefined;
  AddDocument: undefined;
  DocumentDetail: { document: DocumentItem };
};
