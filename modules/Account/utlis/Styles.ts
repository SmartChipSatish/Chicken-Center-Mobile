import { StyleSheet } from "react-native";
import { TEXT_COLORS, TEXT_FONT_SIZE, THEME_COLORS } from "../../GlobalStyles/GlobalStyles";

export const style = StyleSheet.create({
  login_button: {
    width: '100%',
    height: 50,
    backgroundColor: `${THEME_COLORS.secondary}`,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginTop: 10
  },
  details_container: {
    backgroundColor: `${THEME_COLORS.primary}`,
    margin: 8,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#CDCEDA'
  },
  title: {
    fontSize: TEXT_FONT_SIZE.small,
    color: `${TEXT_COLORS.primary}`,
  }, 
  discription: {
    fontSize: 15
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    height: '100%',
    padding:10,
    marginBottom:10
  },
  referAFriend:{
    display:'flex', 
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'#D7D8E3',
    height:80,
    marginBottom:15,
  }
})