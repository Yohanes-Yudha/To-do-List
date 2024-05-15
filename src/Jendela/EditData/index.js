import React, { useState, useEffect } from 'react';
import { useRoute, useNavigation } from '@react-navigation/native';
import { ScrollView, StyleSheet, Text, TextInput, View ,TouchableOpacity, Image} from 'react-native';
import { Add, Back, AddSquare, Book1, Money3, ImportSquare, Note, TransmitSquare } from 'iconsax-react-native';
import { fontType, colors } from '../../theme';
import firestore from '@react-native-firebase/firestore';
import FastImage from 'react-native-fast-image';
import ImagePicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';
const EditData = ({route}) => {
 
  const { id } = route.params;
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [DataBarang, setDataBarang] = useState({
    nama: '',
    deskripsi: '',
  });
  const handleChange = (key, value) => {
    setDataBarang({
      ...DataBarang,
      [key]: value,
    });
    };
  useEffect(() => {
    const subscriber = firestore()
      .collection('barang')
      .doc(id)
      .onSnapshot(documentSnapshot => {
        const dataBarang = documentSnapshot.data();
        if (dataBarang) {
          console.log('Barang data: ', dataBarang);
          setDataBarang({
            nama: dataBarang.nama,
            deskripsi: dataBarang.deskripsi,
            createdAt: new Date(),
          });
         
        } else {
          console.log(`Barang with ID ${id} not found.`);
        }
      });
    setLoading(false);
    return () => subscriber();
  }, [id]);
console.log(DataBarang)
  

const handleUpdate = async () => {
  // setLoading(true);

  try {
    
    
      await firestore().collection('barang').doc(id).update({
        nama: DataBarang.nama,
        deskripsi: DataBarang.deskripsi,
        createdAt: new Date(),
    });
    setLoading(false);
    console.log('Todo List Updated!');
    navigation.navigate('Mytodolist', {id});
  } catch (error) {
    console.log(error);
  }
};
// const handleUpdate = async () => {
//     setLoading(true);
//     let filename = image.substring(image.lastIndexOf('/') + 1);
//     const extension = filename.split('.').pop();
//     const name = filename.split('.').slice(0, -1).join('.');
//     filename = name + Date.now() + '.' + extension;
//     const reference = storage().ref(`barangimages/${filename}`);
// // setLoading(true);
//     try {
//       await reference.putFile(image);
//       const url = await reference.getDownloadURL();
//       await firestore().collection('barang').add({
//       name: form.nama,
//       price: form.harga,
//       image ,
//       description: form.deskripsi,
//       createdAt: new Date(),
//     });
//     setLoading(false);
//     console.log('Tambah Barang Berhasil!');
//     navigation.navigate('DataBarang');
//     }  catch (error) {
//       console.log(error);
//     }
//   };




  return (
  <View style={styles.container}>
    <View style={styles.tempatlogo}>
      <Back style={{ marginLeft: 10, marginTop:5, }} color={colors.white()} variant="Linear" size={40}/> 
            <Text style={{marginLeft: -20, fontFamily:fontType['Pjs-Bold'],color:'#FFFFFF', fontSize:25}} >Edit Data</Text>
          <AddSquare style={{ marginLeft: -20, marginRight:15, marginTop:5, }} color={colors.white()} variant="Linear" size={40}/>          
    </View>
    <View style={styles.container2}>
    <ScrollView 
    showsVerticalScrollIndicator={false}
    style={{flex:1,}}
    contentContainerStyle={{
    paddingHorizontal: 20, 
    marginBottom: 20  
  }}
    >
    <Text style={{marginBottom:-20, marginTop:20, marginLeft:-10,fontSize: 15, color: '#000000', fontFamily:fontType['Pjs-Bold'],  }}>Masukkan To do List</Text>
        <View style={styles.containerForm}>     
             <View style={styles.itemForm}>
                <Book1 style={{marginLeft:10, marginRight:10,  marginTop:-4}}color={colors.grey()} variant="Linear" size={20}/>
                <TextInput
                    placeholder="Nama Barang"
                    value={DataBarang.nama}
                    onChangeText={(text) => handleChange("nama", text)}
                    placeholderTextColor={colors.grey(0.6)}
                    style={{color: 'black', fontSize:15, marginTop:-5,  width:200,   }}
                />
             </View>
        </View>
        
        
        <Text style={{ marginBottom:-20,marginTop:20, marginLeft:-10,fontSize: 15, color: '#000000', fontFamily:fontType['Pjs-Bold'],  }}>Masukkan Deskripsi</Text>
        <View style={styles.containerFormDeskripsi}>     
             <View style={styles.itemForm}>
             <Note style={{marginLeft:10, marginRight:10,  marginTop:-4}}color={colors.grey()} variant="Linear" size={20}/>
                <TextInput
                    placeholder="Deskripsi"
                    value={DataBarang.deskripsi}
                    onChangeText={(text) => handleChange("deskripsi", text)}
                    placeholderTextColor={colors.grey(0.6)}
                    multiline
                    style={{color: 'black', fontSize:15, marginTop:-5, width:200,}}
                />
             </View>
        </View>
        <TouchableOpacity
        onPress={handleUpdate}>
        <View style={styles.containerButton}>
          <Text style={{marginLeft: -5, marginBottom:10, marginTop:-15, fontSize: 15, color: '#000000', fontFamily:fontType['Pjs-Bold'] }} >Submit</Text>
          <TransmitSquare style={{  marginTop:-15, marginLeft:60, }} color={colors.black()} variant="Linear" size={30}/>
        </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  </View> 
  );
};
export default EditData;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#035AA6',
    alignItems:'center',  
  },
  container2:{
    flex:1,
    top:50,
    position:'absolute',
    marginTop:50,
    backgroundColor:'#F0EEF0',
    width: 400,
    height: 600,
    alignItems:'center',
    borderRadius:50,
  },
  gambarBarang:{
    borderRadius:20,
    width: '100%',
    height: '50%',
    marginLeft:2,
  },
  containerButton:{
    marginTop:40,
    paddingTop:25,
    flexDirection: 'row',
    backgroundColor: '#FCBF1E',
    justifyContent:'space-evenly',
    margin:5,
    marginLeft:35,
    borderRadius: 20,
     height: 50,
    width:200,
  },
  tempatlogo: {
    width: 370,
    height: 70,
    padding:5,
    flexDirection:'row',
    justifyContent:'space-between',
    borderRadius: 10,
    alignItems:'center',
  },
  containerForm:{
    marginLeft:-15,
    marginTop:30,
    paddingRight:5,
    backgroundColor: '#4CBED8',    
    borderRadius: 20,
    height: 50,
    width:300,
  },
  containerFormDeskripsi:{
    marginLeft:-15,
    marginTop:30,
    paddingRight:5,
    backgroundColor: '#4CBED8',    
    borderRadius: 20,
    height: 200,
    width:300,
  },
  itemForm:{
    flexDirection:"row",
    flex:1,
    backgroundColor: '#FFFFFF',
    alignItems:'center',
    borderRadius: 20,
    padding:5,
  },
  containerFormGambar:{
    marginLeft:-15,
    marginTop:30,
    paddingRight:5,
    backgroundColor: '#4CBED8',    
    borderRadius: 20,
    height: 250,
    width:300,
  },
  itemFormGambar:{
    flexDirection:"row",
    flex:1,
    backgroundColor: '#FFFFFF',
    alignItems:'center',
    borderRadius: 20,
    padding:5,
  },
})

