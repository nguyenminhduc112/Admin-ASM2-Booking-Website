import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import RootPage, { loaderRoot } from "./pages/RootPage";
import DashboardPage, { loaderDashboard } from "./pages/DashboardPage";
import { loaderLogin } from "./pages/LoginPage.jsx";
import { loaderHotel } from "./pages/HotelPage.jsx";
import { loaderRoom } from "./pages/RoomPage.jsx";
import { loaderTransaction } from "./pages/TransactionPage.jsx";
import { loaderNewHotel } from "./pages/NewHotelPage.jsx";
import { lazy, Suspense } from "react";
import { loaderEditHotel } from "./pages/EditHotelPage.jsx";
import { loaderEditRoom } from "./pages/EditRoomPage.jsx";

const LoginPage = lazy(() => import('./pages/LoginPage.jsx'))
const UserPage = lazy(() => import('./pages/UserPage.jsx'))
const HotelPage = lazy(() => import('./pages/HotelPage.jsx'))
const RoomPage = lazy(() => import('./pages/RoomPage.jsx'))
const TransactionPage = lazy(() => import('./pages/TransactionPage.jsx'))
const NewHotelPage = lazy(() => import('./pages/NewHotelPage.jsx'))
const NewRoomPage = lazy(() => import('./pages/NewRoomPage.jsx'))
const EditHotelPage = lazy(() => import('./pages/EditHotelPage.jsx'))
const EditRoomlPage = lazy(() => import('./pages/EditRoomPage.jsx'))
const routers = createBrowserRouter([
  {
    path: '/', element: <RootPage />, loader: loaderRoot, children: [
      {
        index: true,
        element: <DashboardPage />,
        loader: loaderDashboard
      },
      {
        path: "users",
        element: <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
          <UserPage />
        </Suspense>,
      },
      {
        path: "hotels",
        element: <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}><HotelPage /></Suspense>,
        loader: loaderHotel
      },
      {
        path: "rooms",
        element: <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}> <RoomPage /></Suspense>,
        loader: loaderRoom
      },
      {
        path: "transactions",
        element: <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}><TransactionPage /></Suspense>,
        loader: loaderTransaction
      },
      {
        path: "new hotel",
        element: <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}><NewHotelPage /></Suspense>,
        loader: loaderNewHotel
      },
      {
        path: "edit hotel/:hotelId",
        element: <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}><EditHotelPage /></Suspense>,
        loader: loaderEditHotel
      },
      {
        path: "new room",
        element: <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}><NewRoomPage /></Suspense>
      },
      {
        path: "edit room/:roomId",
        element: <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}><EditRoomlPage /></Suspense>,
        loader: loaderEditRoom
      },
    ]
  },
  {
    path: '/login',
    element: <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}><LoginPage /></Suspense>,
    loader: loaderLogin
  },
])
function App() {
  return (
    <RouterProvider router={routers} />
  );
}

export default App;
