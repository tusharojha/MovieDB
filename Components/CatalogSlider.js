/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';

const CatalogSlider = ({title, data}) => {
  const [details, setDetails] = useState(false);
  const [itemDetails, setItemDetails] = useState({});
  return details ? (
    <View style={{flexDirection: 'row'}}>
      <Image
        style={styles.movieImg}
        source={{
          uri: 'https://image.tmdb.org/t/p/w500' + itemDetails.poster_path,
        }}
      />
      <View style={{flexDirection: 'column'}}>
        <Text style={styles.title}>{itemDetails.title}</Text>
        <Text style={{color: 'white', width: 250}}>{itemDetails.overview}</Text>
        <Text style={{color: 'white', fontSize: 18}}>
          Rating: {itemDetails.vote_average}
        </Text>
        <TouchableOpacity onPress={() => setDetails(false)}>
          <Text style={{color: 'white', fontSize: 18}}>Back</Text>
        </TouchableOpacity>
      </View>
    </View>
  ) : (
    <View>
      <Text style={styles.title}>{title}</Text>
      <View>
        <FlatList
          onEndreachedReached={d => {
            console.log('end reached' + d.toString());
          }}
          onEndReachedThreshold={0.5}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item.id.toString()}
          data={data.results}
          renderItem={({item}) => {
            return (
              <View>
                <TouchableOpacity
                  onPress={() => {
                    setDetails(true);
                    setItemDetails(item);
                  }}>
                  <Image
                    style={styles.movieImg}
                    source={{
                      uri: 'https://image.tmdb.org/t/p/w500' + item.poster_path,
                    }}
                  />
                </TouchableOpacity>
              </View>
            );
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    color: 'white',
    padding: 10,
    fontSize: 20,
  },
  movieImg: {
    margin: 10,
    height: 200,
    width: 125,
    borderRadius: 15,
  },
});

export default CatalogSlider;
