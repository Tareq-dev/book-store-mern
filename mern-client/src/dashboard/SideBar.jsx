import { useEffect, useState } from "react";
import { Sidebar } from "flowbite-react";
import { BiBuoy } from "react-icons/bi";
import {
  HiArrowSmRight,
  HiChartPie,
  HiInbox,
  HiOutlineCloudUpload,
  HiShoppingBag,
  HiTable,
  HiUser,
  HiViewBoards,
} from "react-icons/hi";
import userImg from "../assets/profile.jpg";
import { useContext } from "react";
import { AuthContext } from "../contacts/AuthProvider";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

export const SideBar = () => {
  const [allUsers, setAllUsers] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    fetch("http://localhost:5000/allUsers")
      .then((res) => res.json())
      .then((data) => setAllUsers(data));
  }, []);

  const { user, logOut } = useContext(AuthContext);

  const findRole = allUsers.find((u) => u?.uid === user?.uid)?.role;

  const from = location.state?.from?.pathname || "/";

  const handleLogout = () => {
    logOut()
      .then(() => {
        alert("Sign-out successful|||");
        navigate(from, { replace: true });
      })
      .catch((error) => {});
  };
  return (
    <Sidebar aria-label="Sidebar with content separator example">
      <Sidebar.Logo
        href="/"
        img={user?.photoURL}
        imgAlt="Flowbite logo"
        className="w-16 h-16"
      >
        {user?.displayName || "Demo Users"}
        {findRole && <p className="text-sm -mt-1">({findRole})</p>}
      </Sidebar.Logo>
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Sidebar.Item href="/admin/dashboard" icon={HiChartPie}>
            Dashboard
          </Sidebar.Item>

          {findRole === "seller" && (
            <Sidebar.Item
              href="/admin/dashboard/upload"
              icon={HiOutlineCloudUpload}
            >
              Upload Books
            </Sidebar.Item>
          )}
          {findRole === "seller" && (
            <Sidebar.Item href="/admin/dashboard/manage" icon={HiInbox}>
              Manage Books
            </Sidebar.Item>
          )}
          {findRole === "admin" && (
            <Sidebar.Item href="/admin/dashboard/users" icon={HiUser}>
              Users
            </Sidebar.Item>
          )}
          <Sidebar.Item href="#" icon={HiShoppingBag}>
            Products
          </Sidebar.Item>
          <Sidebar.Item href="/login" icon={HiArrowSmRight}>
            Sign In
          </Sidebar.Item>
          <Sidebar.Item className="cursor-pointer" onClick={handleLogout} icon={HiTable}>
            Sign Out
          </Sidebar.Item>
        </Sidebar.ItemGroup>
        <Sidebar.ItemGroup>
          <Sidebar.Item href="#" icon={HiChartPie}>
            Upgrade to Pro
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={HiViewBoards}>
            Documentation
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={BiBuoy}>
            Help
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
};

export default SideBar;
