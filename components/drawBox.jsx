import React, { useState } from 'react';
import { View, StyleSheet, Dimensions, TouchableOpacity, Text, ImageBackground} from 'react-native';
import Svg, { Path } from 'react-native-svg';

const { height, width } = Dimensions.get('window');
const bgImage = {uri:'https://etc.usf.edu/clipart/48600/48667/48667_graph_blank_md.gif'}

function DrawBox (
  {
    scaleHeight,
    scaleWidth,
    strokeWidth
  }
) {
  const [paths, setPaths] = useState([]);
  const [currentPath, setCurrentPath] = useState([]);
  const [isClearButtonClicked, setClearButtonClicked] = useState(false);

  const onTouchEnd = () => { 
    paths.push(currentPath);
    setCurrentPath([]);
    setClearButtonClicked(false);
  };

  const onTouchMove = (event) => {
    const newPath = [...currentPath];
    const locationX = event.nativeEvent.locationX;
    const locationY = event.nativeEvent.locationY;
    const newPoint = `${newPath.length === 0 ? 'M' : ''}${locationX.toFixed(0)},${locationY.toFixed(0)} `;
    newPath.push(newPoint);
    setCurrentPath(newPath);
  };

  const handleClearButtonClick = () => {
    setPaths([]);
    setCurrentPath([]);
    setClearButtonClicked(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.svgContainer} height={height * scaleHeight} width={width * scaleWidth} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}>
      <ImageBackground source={bgImage} resizeMode='center' style={{flex:1, justifyContent:'center'}}>
        <Svg height={height * scaleHeight} width={width * scaleWidth}>
          <Path
            d={paths.join('')}
            stroke={isClearButtonClicked ? 'transparent' : '#224abf' /*darker blue*/}
            fill={'transparent'}
            strokeWidth={strokeWidth}
            strokeLinejoin={'round'}
            strokeLinecap={'round'}
          />
          {paths.map((item, index) => (
              <Path
                key={`path-${index}`}
                d={currentPath.join('')}
                stroke={isClearButtonClicked ? 'transparent' : '#80b0ff' /* light blue*/}
                fill={'transparent'}
                strokeWidth={strokeWidth}
                strokeLinejoin={'round'}
                strokeLinecap={'round'}
              />
            ))}
        </Svg>
        </ImageBackground>
      </View>
      <TouchableOpacity style={styles.clearButton} onPress={handleClearButtonClick}>
        <Text style={styles.clearButtonText}>Clear</Text>
      </TouchableOpacity>
    </View>
  );
};

export default DrawBox;

const styles = StyleSheet.create({
  container: {
    flex: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  svgContainer: {
    height: height * 0.7,
    width,
    borderColor: 'black',
    backgroundColor: 'white',
    borderWidth: 1,
  },
  clearButton: {
    marginTop: 10,
    backgroundColor: 'black',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  clearButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});