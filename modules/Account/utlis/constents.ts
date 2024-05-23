import { HomeIcon, LocationIcon, WorkingIcon } from "../../assets/svgimages/SaveAsIcons";
import { AddressesIcon, BlogsIcon, ContactUsIcon, FAQSIcon, NotificationsIcon, OrderIcon, PrivacyPolicyIcon, ProfileIcon, RewardsSvgIcon, TermsconditionsIcon, WalletIcon } from "../../assets/svgimages/AccountsSvgs/accountsSvgs";

export const details = [
  {
    Icon: ContactUsIcon,
    title: "Contact Us",
    navigation: 'contactUs'
  },
  {
    Icon: BlogsIcon,
    title: "Blogs",
    navigation: 'contactUs'
  },
  {
    Icon: TermsconditionsIcon,
    title: "Terms & conditions",
    navigation: 'contactUs'
  },
  {
    Icon: FAQSIcon,
    title: "FAQs",
    navigation: 'contactUs'
  },
  {
    Icon: PrivacyPolicyIcon,
    title: "Privacy policy",
    navigation: 'contactUs'
  },
  {
    Icon: NotificationsIcon,
    title: "Cancellaction & Reschedule Policy",
    navigation: 'contactUs'
  }
]

export const afterLoginDetails = [{
  icon: RewardsSvgIcon,
  title: "Rewards",
  content: "Complete milestones and win exciting rewards",
  navigation: 'rewards'

},
{
  icon: ProfileIcon,
  title: "Profile",
  content: "Update profile",
  navigation: 'profile'

},
{
  icon: OrderIcon,
  title: "Orders",
  content: "Orders placed: 0",
  navigation: 'addresses'

},
{
  icon: AddressesIcon,
  title: "Addresses",
  content: "No saved addresses",
  navigation: 'addresses'
},
{
  icon: WalletIcon,
  title: "Wallet",
  content: "Cash : ₹0.0 ",
  navigation: 'wallet'

},
{
  icon: NotificationsIcon,
  title: "Notifications",
  content: "0 unread notification",
  navigation: 'notifications'

},

]

export const saveAs = [{
  icon: HomeIcon,
  title: "Home",
},
{
  icon: WorkingIcon,
  title: "Work",
},
{
  icon: LocationIcon,
  title: "Other",
}
]