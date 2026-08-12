import React from 'react';
import { View, ViewStyle } from 'react-native';

export type IconName =
  | 'vault'
  | 'chat'
  | 'sliders'
  | 'search'
  | 'back'
  | 'chevronRight'
  | 'plus'
  | 'lock'
  | 'check'
  | 'eye'
  | 'eyeOff'
  | 'trash'
  | 'download'
  | 'share'
  | 'globe'
  | 'info'
  | 'spark'
  | 'shieldCheck'
  | 'alert'
  | 'clock'
  | 'scan'
  | 'close'
  | 'backspace';

interface IconProps {
  name: IconName;
  color?: string;
  size?: number;
  stroke?: number;
}

const abs = (style: ViewStyle): ViewStyle => ({ ...style, position: 'absolute' });

export function Icon({ name, color = '#0B1220', size = 24, stroke = 2 }: IconProps) {
  const inner = (() => {
    switch (name) {
      case 'vault':
        return (
          <>
            <View
              style={abs({
                top: 1,
                left: 2,
                width: 20,
                height: 22,
                borderWidth: stroke,
                borderColor: color,
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
                borderBottomLeftRadius: 13,
                borderBottomRightRadius: 13,
              })}
            />
            <View
              style={abs({
                top: 6,
                left: 8,
                width: 8,
                height: 6,
                borderWidth: stroke,
                borderBottomWidth: 0,
                borderColor: color,
                borderTopLeftRadius: 5,
                borderTopRightRadius: 5,
              })}
            />
            <View
              style={abs({
                top: 10,
                left: 5,
                width: 14,
                height: 8,
                borderWidth: stroke,
                borderColor: color,
                borderRadius: 3,
              })}
            />
          </>
        );
      case 'chat':
        return (
          <>
            <View
              style={abs({
                top: 4,
                left: 3,
                width: 18,
                height: 14,
                borderWidth: stroke,
                borderColor: color,
                borderRadius: 7,
              })}
            />
            <View
              style={abs({
                top: 15,
                left: 5,
                width: 6,
                height: 6,
                borderLeftWidth: stroke,
                borderBottomWidth: stroke,
                borderColor: color,
                transform: [{ rotate: '-45deg' }],
              })}
            />
          </>
        );
      case 'sliders':
        return (
          <>
            <View
              style={abs({
                top: 6,
                left: 4,
                width: 14,
                height: stroke,
                borderRadius: stroke / 2,
                backgroundColor: color,
              })}
            />
            <View
              style={abs({
                top: 4.5,
                left: 15,
                width: 5,
                height: 5,
                borderRadius: 2.5,
                backgroundColor: color,
              })}
            />
            <View
              style={abs({
                top: 13,
                left: 2,
                width: 18,
                height: stroke,
                borderRadius: stroke / 2,
                backgroundColor: color,
              })}
            />
            <View
              style={abs({
                top: 11.5,
                left: 11,
                width: 5,
                height: 5,
                borderRadius: 2.5,
                backgroundColor: color,
              })}
            />
            <View
              style={abs({
                top: 20,
                left: 6,
                width: 10,
                height: stroke,
                borderRadius: stroke / 2,
                backgroundColor: color,
              })}
            />
            <View
              style={abs({
                top: 18.5,
                left: 8,
                width: 5,
                height: 5,
                borderRadius: 2.5,
                backgroundColor: color,
              })}
            />
          </>
        );
      case 'search':
        return (
          <>
            <View
              style={abs({
                top: 5,
                left: 5,
                width: 12,
                height: 12,
                borderRadius: 6,
                borderWidth: stroke,
                borderColor: color,
              })}
            />
            <View
              style={abs({
                top: 15,
                left: 16,
                width: stroke,
                height: 7,
                borderRadius: stroke / 2,
                backgroundColor: color,
                transform: [{ rotate: '45deg' }],
              })}
            />
          </>
        );
      case 'back':
        return (
          <View
            style={abs({
              top: 7.5,
              left: 9,
              width: 9,
              height: 9,
              borderLeftWidth: stroke,
              borderBottomWidth: stroke,
              borderColor: color,
              transform: [{ rotate: '45deg' }],
            })}
          />
        );
      case 'chevronRight':
        return (
          <View
            style={abs({
              top: 7.5,
              left: 6,
              width: 9,
              height: 9,
              borderRightWidth: stroke,
              borderTopWidth: stroke,
              borderColor: color,
              transform: [{ rotate: '45deg' }],
            })}
          />
        );
      case 'plus':
        return (
          <>
            <View
              style={abs({
                top: 11,
                left: 5,
                width: 14,
                height: stroke,
                borderRadius: stroke / 2,
                backgroundColor: color,
              })}
            />
            <View
              style={abs({
                top: 5,
                left: 11,
                width: stroke,
                height: 14,
                borderRadius: stroke / 2,
                backgroundColor: color,
              })}
            />
          </>
        );
      case 'close':
        return (
          <>
            <View
              style={abs({
                top: 5,
                left: 11,
                width: stroke,
                height: 14,
                borderRadius: stroke / 2,
                backgroundColor: color,
                transform: [{ rotate: '45deg' }],
              })}
            />
            <View
              style={abs({
                top: 5,
                left: 11,
                width: stroke,
                height: 14,
                borderRadius: stroke / 2,
                backgroundColor: color,
                transform: [{ rotate: '-45deg' }],
              })}
            />
          </>
        );
      case 'lock':
        return (
          <>
            <View
              style={abs({
                top: 6,
                left: 7,
                width: 10,
                height: 8,
                borderWidth: stroke,
                borderBottomWidth: 0,
                borderColor: color,
                borderTopLeftRadius: 6,
                borderTopRightRadius: 6,
              })}
            />
            <View
              style={abs({
                top: 11,
                left: 5,
                width: 14,
                height: 10,
                borderWidth: stroke,
                borderColor: color,
                borderRadius: 3,
              })}
            />
          </>
        );
      case 'check':
        return (
          <View
            style={abs({
              top: 7,
              left: 6,
              width: 10,
              height: 6,
              borderLeftWidth: stroke,
              borderBottomWidth: stroke,
              borderColor: color,
              transform: [{ rotate: '-45deg' }],
            })}
          />
        );
      case 'eye':
        return (
          <>
            <View
              style={abs({
                top: 6,
                left: 2,
                width: 20,
                height: 12,
                borderWidth: stroke,
                borderColor: color,
                borderRadius: 9,
              })}
            />
            <View
              style={abs({
                top: 9.5,
                left: 9.5,
                width: 5,
                height: 5,
                borderRadius: 2.5,
                backgroundColor: color,
              })}
            />
          </>
        );
      case 'eyeOff':
        return (
          <>
            <View
              style={abs({
                top: 6,
                left: 2,
                width: 20,
                height: 12,
                borderWidth: stroke,
                borderColor: color,
                borderRadius: 9,
              })}
            />
            <View
              style={abs({
                top: 3,
                left: 11,
                width: stroke,
                height: 18,
                borderRadius: stroke / 2,
                backgroundColor: color,
                transform: [{ rotate: '45deg' }],
              })}
            />
          </>
        );
      case 'trash':
        return (
          <>
            <View
              style={abs({
                top: 5,
                left: 9,
                width: 6,
                height: 4,
                borderWidth: stroke,
                borderBottomWidth: 0,
                borderColor: color,
                borderTopLeftRadius: 3,
                borderTopRightRadius: 3,
              })}
            />
            <View
              style={abs({
                top: 8,
                left: 6,
                width: 12,
                height: stroke,
                borderRadius: stroke / 2,
                backgroundColor: color,
              })}
            />
            <View
              style={abs({
                top: 10,
                left: 6,
                width: 12,
                height: 10,
                borderLeftWidth: stroke,
                borderRightWidth: stroke,
                borderBottomWidth: stroke,
                borderColor: color,
                borderBottomLeftRadius: 3,
                borderBottomRightRadius: 3,
              })}
            />
            <View
              style={abs({ top: 14, left: 9, width: stroke, height: 4, backgroundColor: color })}
            />
            <View
              style={abs({ top: 14, left: 13, width: stroke, height: 4, backgroundColor: color })}
            />
          </>
        );
      case 'download':
        return (
          <>
            <View
              style={abs({
                top: 19,
                left: 5,
                width: 14,
                height: stroke,
                borderRadius: stroke / 2,
                backgroundColor: color,
              })}
            />
            <View
              style={abs({
                top: 5,
                left: 11,
                width: stroke,
                height: 8,
                borderRadius: stroke / 2,
                backgroundColor: color,
              })}
            />
            <View
              style={abs({
                top: 10,
                left: 7.5,
                width: 9,
                height: 9,
                borderLeftWidth: stroke,
                borderBottomWidth: stroke,
                borderColor: color,
                transform: [{ rotate: '-45deg' }],
              })}
            />
          </>
        );
      case 'share':
        return (
          <>
            <View
              style={abs({
                top: 19,
                left: 5,
                width: 14,
                height: stroke,
                borderRadius: stroke / 2,
                backgroundColor: color,
              })}
            />
            <View
              style={abs({
                top: 10,
                left: 11,
                width: stroke,
                height: 7,
                borderRadius: stroke / 2,
                backgroundColor: color,
              })}
            />
            <View
              style={abs({
                top: 4,
                left: 7.5,
                width: 9,
                height: 9,
                borderLeftWidth: stroke,
                borderTopWidth: stroke,
                borderColor: color,
                transform: [{ rotate: '45deg' }],
              })}
            />
          </>
        );
      case 'globe':
        return (
          <>
            <View
              style={abs({
                top: 4,
                left: 4,
                width: 16,
                height: 16,
                borderRadius: 8,
                borderWidth: stroke,
                borderColor: color,
              })}
            />
            <View
              style={abs({
                top: 8,
                left: 5,
                width: 14,
                height: stroke,
                borderRadius: stroke / 2,
                backgroundColor: color,
              })}
            />
            <View
              style={abs({
                top: 5,
                left: 11,
                width: stroke,
                height: 14,
                borderRadius: stroke / 2,
                backgroundColor: color,
              })}
            />
          </>
        );
      case 'info':
        return (
          <>
            <View
              style={abs({
                top: 4,
                left: 4,
                width: 16,
                height: 16,
                borderRadius: 8,
                borderWidth: stroke,
                borderColor: color,
              })}
            />
            <View
              style={abs({
                top: 7.5,
                left: 10.75,
                width: 2.5,
                height: 2.5,
                borderRadius: 1.25,
                backgroundColor: color,
              })}
            />
            <View
              style={abs({
                top: 12,
                left: 11,
                width: stroke,
                height: 6,
                borderRadius: stroke / 2,
                backgroundColor: color,
              })}
            />
          </>
        );
      case 'spark':
        return (
          <>
            <View
              style={abs({
                top: 4,
                left: 10.5,
                width: 3,
                height: 16,
                borderRadius: 1.5,
                backgroundColor: color,
                transform: [{ rotate: '45deg' }],
              })}
            />
            <View
              style={abs({
                top: 4,
                left: 10.5,
                width: 3,
                height: 16,
                borderRadius: 1.5,
                backgroundColor: color,
                transform: [{ rotate: '-45deg' }],
              })}
            />
            <View
              style={abs({
                top: 1.5,
                left: 16,
                width: 3.5,
                height: 3.5,
                borderRadius: 1.75,
                backgroundColor: color,
              })}
            />
          </>
        );
      case 'shieldCheck':
        return (
          <>
            <View
              style={abs({
                top: 1,
                left: 2,
                width: 20,
                height: 22,
                borderWidth: stroke,
                borderColor: color,
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
                borderBottomLeftRadius: 13,
                borderBottomRightRadius: 13,
              })}
            />
            <View
              style={abs({
                top: 9,
                left: 8.5,
                width: 7,
                height: 5,
                borderLeftWidth: stroke,
                borderBottomWidth: stroke,
                borderColor: color,
                transform: [{ rotate: '-45deg' }],
              })}
            />
          </>
        );
      case 'alert':
        return (
          <>
            <View
              style={abs({
                top: 4,
                left: 4,
                width: 16,
                height: 16,
                borderRadius: 8,
                borderWidth: stroke,
                borderColor: color,
              })}
            />
            <View
              style={abs({
                top: 8,
                left: 11,
                width: stroke,
                height: 6,
                borderRadius: stroke / 2,
                backgroundColor: color,
              })}
            />
            <View
              style={abs({
                top: 15.5,
                left: 10.75,
                width: 2.5,
                height: 2.5,
                borderRadius: 1.25,
                backgroundColor: color,
              })}
            />
          </>
        );
      case 'clock':
        return (
          <>
            <View
              style={abs({
                top: 4,
                left: 4,
                width: 16,
                height: 16,
                borderRadius: 8,
                borderWidth: stroke,
                borderColor: color,
              })}
            />
            <View
              style={abs({
                top: 8,
                left: 11,
                width: stroke,
                height: 5,
                borderRadius: stroke / 2,
                backgroundColor: color,
              })}
            />
            <View
              style={abs({
                top: 11,
                left: 10,
                width: 4,
                height: stroke,
                borderRadius: stroke / 2,
                backgroundColor: color,
              })}
            />
          </>
        );
      case 'scan':
        return (
          <>
            <View
              style={abs({
                top: 4,
                left: 4,
                width: 7,
                height: 7,
                borderTopWidth: stroke,
                borderLeftWidth: stroke,
                borderColor: color,
                borderTopLeftRadius: 2,
              })}
            />
            <View
              style={abs({
                top: 4,
                right: 4,
                width: 7,
                height: 7,
                borderTopWidth: stroke,
                borderRightWidth: stroke,
                borderColor: color,
                borderTopRightRadius: 2,
              })}
            />
            <View
              style={abs({
                bottom: 4,
                left: 4,
                width: 7,
                height: 7,
                borderBottomWidth: stroke,
                borderLeftWidth: stroke,
                borderColor: color,
                borderBottomLeftRadius: 2,
              })}
            />
            <View
              style={abs({
                bottom: 4,
                right: 4,
                width: 7,
                height: 7,
                borderBottomWidth: stroke,
                borderRightWidth: stroke,
                borderColor: color,
                borderBottomRightRadius: 2,
              })}
            />
          </>
        );
      case 'backspace':
        return (
          <>
            <View
              style={abs({
                top: 8,
                left: 6,
                width: 8,
                height: 8,
                borderLeftWidth: stroke,
                borderBottomWidth: stroke,
                borderColor: color,
                transform: [{ rotate: '45deg' }],
              })}
            />
            <View
              style={abs({
                top: 6,
                left: 14,
                width: stroke,
                height: 12,
                borderRadius: stroke / 2,
                backgroundColor: color,
              })}
            />
          </>
        );
    }
  })();

  return (
    <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
      <View style={{ width: 24, height: 24, transform: [{ scale: size / 24 }] }}>{inner}</View>
    </View>
  );
}
