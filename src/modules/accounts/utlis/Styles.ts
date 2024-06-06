import { StyleSheet } from "react-native";
import { TEXT_COLORS, TEXT_FONT_SIZE, THEME_COLORS } from "../../../globalStyle/GlobalStyles";

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
    padding: 10,
    marginBottom: 10,
    // justifyContent:'center',
    // alignItems:'center'
  },
  referAFriend: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#D7D8E3',
    height: 80,
    marginBottom: 15,
  },
  logout_container: {
    width: '100%',
    height: 50,
    backgroundColor: `${THEME_COLORS.primary}`,
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10
  }, login_icon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 20
  }, referText: {
    color: TEXT_COLORS.primary
  }, footer_Text: {
    color: TEXT_COLORS.primary,
    marginTop: '2%',
    marginBottom: '4%',
    fontSize: 15
    // fontWeight:'bold'
  }, logo: {
    backgroundColor: THEME_COLORS.secondary,
    width: 60,
    height: 60,
    borderRadius: 50,
    objectFit: 'contain'
  }, account: {
    flexDirection: 'row',
    alignItems: 'center'
  }, main_title: {
    color: THEME_COLORS.secondary,
    fontWeight: 'bold',
    fontSize: 18
  }
})