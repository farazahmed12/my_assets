import {
    heightPercentageToDP,
    widthPercentageToDP,
  } from 'react-native-responsive-screen';
  import {
    Animated,
    Dimensions,
    Image,
    FlatList,
    StyleSheet,
    View,
  } from 'react-native';
  import React, {useRef, useState} from 'react';
  import color from '../constants/color';
  const {width, height} = Dimensions.get('window');
  
  const Banner = ({data}) => {
    const scrollX = useRef(new Animated.Value(0)).current;
    const [activeIndex, setActiveIndex] = useState(0);
  
    const renderBanner = ({item}) => {
      return (
        <View style={styles.renderBannerStyle} className="rounded-2xl">
          <Image
            source={{uri: item}}
            resizeMode="cover"
            style={styles.bannerImg}
          />
        </View>
      );
    };
    return (
      <View style={{flex: 1, width: '100%'}}>
        <View style={styles.container} className="rounded-2xl">
          <FlatList
            data={data ? data : []}
            renderItem={renderBanner}
            keyExtractor={(_, index) => index.toString()}
            pagingEnabled
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentInsetAdjustmentBehavior="automatic"
            scrollEventThrottle={10}
            onMomentumScrollEnd={e => {
              setActiveIndex(
                e.nativeEvent.contentOffset.x / Dimensions.get('window').width,
              );
            }}
            onScroll={Animated.event([
              {
                nativeEvent: {
                  contentOffset: {
                    x: scrollX,
                  },
                },
              },
            ])}
          />
        </View>
        <View style={styles.dotConatiner}>
          <View style={styles.indicatorContainer}>
            {data &&
              data.map((_, imageIndex) => {
                const animatedWidth = scrollX.interpolate({
                  inputRange: [
                    width * (imageIndex - 2),
                    width * imageIndex,
                    width * (imageIndex + 1),
                  ],
                  outputRange: [8, 20, 8],
                  extrapolate: 'clamp',
                });
                return (
                  <Animated.View
                    key={imageIndex}
                    style={[
                      styles.normalDot,
                      {
                        width: animatedWidth,
                        opacity: Math.round(activeIndex) == imageIndex ? 1 : 0.3,
                      },
                    ]}
                  />
                );
              })}
          </View>
        </View>
      </View>
    );
  };
  
  export default Banner;
  
  const styles = StyleSheet.create({
    container: {
      width: '92%',
      alignItems: 'center',
  
      // justifyContent: 'center',
      borderRadius: widthPercentageToDP(2),
      // marginTop: heightPercentageToDP(3),
      height: heightPercentageToDP(40),
      overflow: 'hidden',
      alignSelf: 'center',
    },
    dotConatiner: {
      // flex: 1,
      // alignItems: 'center',
      // justifyContent: 'center',
      marginTop: heightPercentageToDP(1.2),
      width: '100%',
    },
    normalDot: {
      height: widthPercentageToDP(1.8),
      width: widthPercentageToDP(1.8),
      borderRadius: 100,
      backgroundColor: color.colorPrimary,
      marginHorizontal: widthPercentageToDP(0.6),
    },
    indicatorContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    renderBannerStyle: {
      alignItems: 'center',
      justifyContent: 'center',
      width: widthPercentageToDP(92),
      height: heightPercentageToDP(40),
      overflow: 'hidden',
    },
    bannerImg: {
      width: '100%',
      height: '100%',
    },
  });
  