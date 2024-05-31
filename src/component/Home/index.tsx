import {
  View,
  Text,
  Button,
  Alert,
  TextInput,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const Home = ({navigation}: any) => {
  const [task, setTask] = useState('');
  const [description, setDescription] = useState('');
  const [todos, setTodos] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const ref = firestore().collection('Todos');

  const handleLogOut = () => {
    auth()
      .signOut()
      .then(() => Alert.alert('User signed out!'));
    navigation.navigate('Login');
  };

  const getData = () => {
    ref.onSnapshot(querySnapshot => {
      const todos: any = [];
      querySnapshot.forEach(doc => {
        todos.push({
          ...doc.data(),
          id: doc.id,
        });
      });
      setTodos(todos);
    });
  };

  useEffect(() => {
    getData();
  }, []);

  const addTodo = async () => {
    if (editingId) {
      try {
        await ref.doc(editingId).update({
          task,
          description,
        });
        Alert.alert('Todo Updated!');
        setEditingId(null);
      } catch (error) {
        Alert.alert('Error updating todo');
      }
    } else {
      try {
        await ref.add({
          task,
          description,
          status: 'pending',
        });
        Alert.alert('Todo Added!');
      } catch (error) {
        Alert.alert('Error adding todo');
      }
    }
    setTask('');
    setDescription('');
  };

  const updateStatus = (id: any, status: string) => {
    ref.doc(id).update({
      status: status === 'pending' ? 'completed' : 'pending',
    });
  };

  const deleteTodo = (id: any) => {
    ref.doc(id).delete();
    Alert.alert('Deleted Todo!');
  };

  const startEditing = (item: any) => {
    setTask(item.task);
    setDescription(item.description);
    setEditingId(item.id);
  };

  const renderItem = ({item}: any) => {
    return (
      <View style={styles.boxStyle}>
        <View style={styles.boxStyleInner}>
          <TouchableOpacity onPress={() => updateStatus(item.id, item.status)}>
            <Text
              style={{
                marginBottom: 10,
                textDecorationLine:
                  item.status === 'completed' ? 'line-through' : 'none',
              }}>
              Task Name: {item.task}
            </Text>
          </TouchableOpacity>
          <Text>Task Description: {item.description}</Text>
        </View>
        <View style={styles.btn}>
          <Button
            title="Delete"
            onPress={() => deleteTodo(item.id)}
            color={'red'}
          />
          <Button title="Update" onPress={() => startEditing(item)} />
        </View>
      </View>
    );
  };

  return (
    <View style={{flex: 1, padding: 20}}>
      <Text
        style={{
          textAlign: 'center',
          fontWeight: 'bold',
          fontSize: 20,
          marginBottom: 20,
        }}>
        To do list
      </Text>
      <TextInput
        placeholder="Task"
        value={task}
        onChangeText={setTask}
        style={styles.input}
      />
      <TextInput
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        style={styles.input}
      />
      <View style={{marginVertical: 10}}>
        <Button
          title={editingId ? 'Update Todo' : 'Add Todo'}
          onPress={addTodo}
        />
      </View>
      <FlatList data={todos} renderItem={renderItem} />
      <View style={{marginVertical: 10}}>
        <Button title="LogOut" onPress={handleLogOut} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    marginVertical: 10,
    padding: 10,
    borderRadius: 12,
  },
  boxStyle: {
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 10,
    justifyContent: 'space-between',
    borderWidth: 1,
    padding: 10,
  },
  boxStyleInner: {
    marginBottom: 30,
  },
  btn:{
    width:'100%',
    flexDirection:'row',
    justifyContent:'space-around',
    alignItems:'center',
  }
});

export default Home;
