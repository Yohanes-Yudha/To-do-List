import {useState, React} from 'react';
import { ActivityIndicator, Modal, Alert,TouchableOpacity, Button, ScrollView, StyleSheet,  Text, TextInput, View, Image, ImageBackground} from 'react-native';
import { Add, ShoppingCart,Back,Bag,Notification, Receipt21, Clock, Message, SearchNormal1, RulerPen, Category, Book1, TicketDiscount, BagCross, CloseCircle, Money, Money2, Money4, Money3, ImportSquare, DocumentSketch, Note, Subtitle, Okru, Check, LikeShapes, PasswordCheck, TransmitSquare, AddSquare} from 'iconsax-react-native';
import { fontType, colors } from '../../theme';
import {ContentBook, ContentRuler } from '../../IsiKonten';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import FastImage from 'react-native-fast-image';
import ImagePicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
export default function TambahData() {
    
const navigation = useNavigation();
// const [loading, setLoading] = useState(false);
const handleUpload = async () => {
    try {
      await firestore().collection('barang').add({
        nama: DataBarang.nama,
        deskripsi: DataBarang.deskripsi,
        createdAt: new Date(),
      });
      console.log('Tambah TodoList Berhasil!');
      navigation.navigate('Mytodolist');
    } catch (error) {
      console.log(error);
    }
  };
   const [DataBarang, setDataBarang] = useState({
    nama: "",
    deskripsi:""
  });
  const handleChange = (key, value) => {
    setDataBarang({
      ...DataBarang,
      [key]: value,
    });
  };
  
  return (
  <View style={styles.container}>
    <View style={styles.tempatlogo}>
      <Back style={{ marginLeft: 10, marginTop:5, }} color={colors.white()} variant="Linear" size={40}/> 
            <Text style={{marginLeft: -20, fontFamily:fontType['Pjs-Bold'],color:'#FFFFFF', fontSize:25}} >To Do List</Text>
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
    <Text style={{marginBottom:-20, marginTop:20, marginLeft:-10,fontSize: 15, color: '#000000', fontFamily:fontType['Pjs-Bold'],  }}>Masukkan to do List</Text>
        <View style={styles.containerForm}>     
             <View style={styles.itemForm}>
                <Book1 style={{marginLeft:10, marginRight:10,  marginTop:-4}}color={colors.grey()} variant="Linear" size={20}/>
                <TextInput
                    placeholder="Judul Todo List"
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
        onPress={handleUpload}>
        <View style={styles.containerButton}>
          <Text style={{marginLeft: -5, marginBottom:10, marginTop:-15, fontSize: 15, color: '#000000', fontFamily:fontType['Pjs-Bold'] }} >Submit</Text>
          <TransmitSquare style={{  marginTop:-15, marginLeft:60, }} color={colors.black()} variant="Linear" size={30}/>
        </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  </View> 
  )
}
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

