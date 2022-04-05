import DashboardIcon from "@mui/icons-material/Dashboard";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import CategoryIcon from "@mui/icons-material/Category";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PersonIcon from "@mui/icons-material/Person";
import ReviewsIcon from "@mui/icons-material/Reviews";
import StoreIcon from "@mui/icons-material/Store";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import CAP from "../../views/CAP";
import Products from "../../views/Products";
import Stall from "../../views/Stall";
import Dashboash from "../../views/DashBoash";

const initialSidebars = [
  {
    title: "Dashboard",
    router: "/",
    icon: DashboardIcon,
    //component: Dashboash,
  },
  {
    title: "Gian hàng",
    icon: StoreIcon,
    router: "/gian-hang",
    //component: Stall,
  },
  {
    title: "Khuyến mãi",
    icon: AttachMoneyIcon,
    router: "/khuyen-mai",
    //component: Stall,
  },
  {
    title: "Sản phẩm",
    icon: MenuBookIcon,
    router: "/san-pham",
    //component: Products,
  },
  {
    title: "Thể loại/Tác giả/NXB",
    icon: CategoryIcon,
    router: "/the-loai/tac-gia/nha-xuat-ban",
    //component: CAP,
  },
  {
    title: "Đơn hàng",
    icon: ShoppingCartIcon,
    router: "/don-hang",
  },
  {
    title: "Đánh giá của khách hàng",
    icon: ReviewsIcon,
    router: "/danh-gia",
  },
  {
    title: "Thông tin tài khoản",
    router: "/trang-ca-nhan",
  },
];

export default initialSidebars;
