import { StyleSheet } from 'react-native'

export const chatScreenStyles = StyleSheet.create({
    headerContainer: {
        backgroundColor: 'whitesmoke',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
        marginRight: 15,
        marginLeft: 15,
    },
    headerTitle: {
        fontWeight: 'bold',
        fontSize: 17,
    },
    screenContainer: {
        backgroundColor: 'white',
        flex: 1,
    },
    newConversationIcon: {
        color: '#3396FD'
    },
    editButton: {
        fontSize: 19,
        color: '#3396FD'
    }
})