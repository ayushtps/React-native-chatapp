import firestore from '@react-native-firebase/firestore';
import {useCallback, useContext, useEffect, useState} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {GiftedChat, InputToolbar, Send} from 'react-native-gifted-chat';
import {AuthenticatedUserContext} from '../../../App';
import Header from '../layout/Header';
import { colors } from '../../constants/colors';

const sendBtn = require('../../asset/icon/Send.png');

const ChatComponent = ({route}: any) => {
  const {c_user} = route.params;
  const {user}: any = useContext(AuthenticatedUserContext);
  const [messages, setMessages] = useState([]);

  const chatId =
    c_user.uid > user.uid
      ? user.uid + '-' + c_user.uid
      : c_user.uid + '-' + user.uid;

  const ref = firestore()
    .collection('chats')
    .doc(chatId)
    .collection('messages');

  const userObj = {
    _id: user.uid,
    avatar:c_user.avatar
  };

  const getChat = () => {
    const unsubscribe = ref
      .orderBy('createdAt', 'desc')
      .onSnapshot(snapshot => {
        const fetchedMessages = snapshot.docs.map(doc => ({
          ...doc.data(),
          createdAt: doc.data().createdAt.toDate(),
        }));
        setMessages(fetchedMessages);
      }); 
    return () => unsubscribe();
  };

  useEffect(() => {
    getChat();
  }, [messages]);

  const customInputToolbar = (props: any) => {
    return (
      <InputToolbar
        {...props}
        containerStyle={{
          backgroundColor: 'white',
          borderRadius: 24,
          marginHorizontal: 12,
          marginBottom: 3,
          elevation: 6,
          borderTopColor: '#E8E8E8',
          borderTopWidth: 1,
        }}
      />
    );
  };

  const onSend = useCallback((messagesArray = []) => {
    const newMessage = messagesArray[0];
    const addObj = {
      senderId: user.uid,
      receiverId: c_user.uid,
      createdAt: new Date(),
    };
    ref.add({
      ...newMessage,
      addObj,
    });
  }, []);

  const renderAvatar = (props: any) => {
    const { currentMessage } = props;
    if (currentMessage.user._id === c_user.uid) {
      return (
        <View style={styles.avatar}>
          <Image
            source={{uri: c_user.avatar || 'https://www.w3schools.com/howto/img_avatar.png'}}
            height={30}
            width={30}
            style={styles.img}
          />
        </View>
      );
    }
    return null;
  };

  const renderSend = (props: any) => {
    return (
      <Send {...props}>
        <View style={styles.sendbtn}>
          <Image source={sendBtn} />
        </View>
      </Send>
    );
  };


  return (
    <View style={styles.main}>
      <Header
        title={c_user.name}
        image={c_user.avatar}
        isShow={true}
      />
      <View style={styles.container}>
        <GiftedChat
          renderSend={renderSend}
          showAvatarForEveryMessage={true}
          renderAvatar={renderAvatar}
          alwaysShowSend
          renderInputToolbar={props => customInputToolbar(props)}
          messages={messages}
          showUserAvatar={true}
          user={userObj}
          onSend={messages => onSend(messages)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    height: '100%',
    backgroundColor: colors.secondaryColor,
  },
  container: {
    flex: 1,
    backgroundColor: colors.secondaryColor,
  },
  avatar: {
    backgroundColor: colors.PrimaryColor,
    padding: 10,
    borderRadius: 50,
  },
  img: {
    borderRadius: 50,
  },
  sendbtn: {
    justifyContent: 'center',
    height: '100%',
    padding: 10,
    borderRadius: 50,
  },
});

export default ChatComponent;
