import {  } from "module";
const GeoCoder = require('react-native-geodb');
const GeoDBCitiesSearch = require('react-native-geodb');

var userlat=0,userlng=0;
const APIKEY = "b1dbf47337msh5961c6faded1305p14aef0jsnc2e022c645fd";

// var defaultClient = GeoDb.ApiClient.instance;

// var userSecurity = defaultClient.authentications['UserSecurity'];
// userSecurity.apiKey = "APIKEY";

<GeoDBCitiesSearch
    debounce={200}
    placeholder="Search cities"
    placeholderTextColor="#f5f5f5"
    onSelectItem={(data: { city: any; })=>console.log(data.city)}
    //emptyListImagePlaceholder
    query={{
      key: APIKEY,
      api: 'geo',
      types: 'cities'
    }}
    params={{
      language: 'en',
      limit: 10,
      offset: 0
    }}
    // renderLeftButton={() => <CustomIconButton onPress={...}>}
    // renderItem={({ item }) => <CustomSearchItem />}
    // ListEmptyComponent={({ metadata, styles, source }) => <CustomEmptyList />}
    // styles={{...}} (https://www.npmjs.com/package/react-native-geodb)
/>

GeoCoder({lat: userlat, lng: userlng}, APIKEY).then((response: any)=> {
  console.log(response);
});