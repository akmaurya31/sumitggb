import PersonIcon from '@mui/icons-material/Person';
import ListAltIcon from '@mui/icons-material/ListAlt';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import CardTravelIcon from '@mui/icons-material/CardTravel';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import RedeemIcon from '@mui/icons-material/Redeem';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import LocationOnIcon from '@mui/icons-material/LocationOn';

export const ProfileMenuLinks = [
  { name: "Orders", icon: <ListAltIcon />, link: "/profile/orders" },
  { name: "Exciting Deals", icon: <Inventory2Icon />, link: "/profile/packages" },
  { name: "My Address", icon: <LocationOnIcon />, link: "/profile/address" },
  { name: "Membership", icon: <CardTravelIcon />, link: "/profile/membership" },
  { name: "Passbook", icon: <AutoStoriesIcon />, link: "/profile/passbook" },
  { name: "Coupons", icon: <RedeemIcon />, link: "/profile/coupons" },
  { name: "Account details", icon: <AccountBalanceIcon />, link: "/profile/account" },
  { name: "Logout", icon: <PowerSettingsNewIcon />, link: "logout" },
];