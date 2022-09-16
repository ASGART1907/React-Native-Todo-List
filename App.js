import { StatusBar } from 'expo-status-bar';
import React,{useState,useEffect} from 'react';
import { View,TouchableOpacity,StyleSheet,Text,TextInput,FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AntDesign } from '@expo/vector-icons';

const App = () => {

  const [text,setText] = useState("");
  const [list,setList] = useState([]);
  const [count,setCount] = useState(0);
  const [isButton,setIsButton] = useState(false);

  useEffect(() => {
    if(text) setIsButton(true)
    else setIsButton(false);
  },[text]);

  const createTodo = () => {
    setCount(count => count += 1);
    setList([{
      id:count,
      value:text
    },
    ...list
  ]);

  setText("");
  }

  const removeTodo = (id) => {
    setList(list => list.filter(item => item.id !== id));
  }

  const renderItem = ({item}) => {
    return  <View style={styles.todo}>
                       <Text style={{fontSize:20,fontWeight:"200"}}>
                         {item.value}
                       </Text>
                    <Text>
                    <AntDesign onPress={() => removeTodo(item.id)} name="closecircle" size={24} color="red" />
                    </Text>
              </View>
            
  }

  return (
    <SafeAreaView style={{flex:1}}>
      <StatusBar
      backgroundColor='limegreen'
      />
          <View style={styles.container}>
            <Text style={styles.title}>
              Todo List
            </Text>

            <View style={styles.inputs}>
              <TextInput
              style={styles.input}
              onChangeText={setText}
              value={text}
              placeholder="Enter to todo..."
              />
              <TouchableOpacity onPress={createTodo}>
                {
                  isButton && <View style={styles.addBtn}>
                                <Text style={{color:"white",fontWeight:"600"}}>
                                  <AntDesign name="pluscircleo" size={24} color="white" />              
                                </Text>
                              </View>
                }
                  
                </TouchableOpacity>
            </View>
            {
              list.length < 1 ? <View style={{
                flexDirection:"column",
                alignItems:"center",
                justifyContent:"center",
                marginTop:90
              }}>
                  <Text style={{
                      paddingHorizontal:50,
                    }}>
                      <AntDesign name="exclamationcircleo" size={200} color="deeppink" />
                  </Text>
                  <Text style={{
                    fontSize:20,
                    fontWeight:"400",
                    marginTop:5
                  }}>
                    Todo list null...
                  </Text>
               </View> :
              <FlatList
              style={{marginTop:20}}
              data={list}
              renderItem={renderItem}
              keyExtractor={item => item.id}
              />
            }
          
          </View>
    </SafeAreaView>
    
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    margin:10
  },
  title:{
    fontSize:35,
    padding:5,
    fontWeight:"300",
    marginTop:80
  },
  inputs:{
    width:"100%",
    height:40,
    alignItems:"center",
    justifyContent:"space-between",
    flexDirection:"row",
    marginLeft:5,
    gap:10,
    marginTop:20
  },
  input:{
    width:"80%",
    padding:10,
    backgroundColor:"lightgray",
    borderRadius:10,
    fontSize:20,
    fontWeight:"400"
  },
  addBtn:{
    backgroundColor:"deeppink",
    borderRadius:10,
    alignItems:"center",
    justifyContent:"center",
    paddingHorizontal:10,
    marginRight:20,
    flex:1
  },
  todo:{
    backgroundColor:"lightgreen",
    width:"90%",
    alignItems:"center",
    justifyContent:"space-between",
    flexDirection:"row",
    padding:10,
    borderRadius:5,
    margin:5
  },
  list:{
    position:"relative",
    backgroundColor:"lime",
    marginTop:50
  }
});

export default App;