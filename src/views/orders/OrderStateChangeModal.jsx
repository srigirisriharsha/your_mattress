import { useAuth } from '../../context/MainContext';
import { updateOrderStatus } from '../../services/shop/shopservice';

const OrderStateChangeModal = ({
  showModal,
  setShowModal,
  stateObj,
  setStateObj,
}) => {
  const { user } = useAuth();

  const status =
    stateObj?.cartDataObj.order_status === 'Delivered' ? 'Return' : 'Cancel';
  const onSubmit = async () => {
    const values = {
      id: stateObj?.cartDataObj?.id,
      moveStatusTo: `${status}ed`,
      updatedBy: user,
    };

    // Call the update order status function
    const resps = await updateOrderStatus(values);
    if (resps && resps?.data) {
      if (resps?.data?.success) {
        setShowModal(false);
        setStateObj({
          ...stateObj,
          cartDataObj: { ...stateObj.cartDataObj, order_status: `${status}ed` },
        });
      }
    }
  };

  return (
    <>
      {showModal ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-gray-800 bg-opacity-50">
          <div className="relative w-full max-w-md bg-white rounded-lg shadow-lg">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-xl">
                <b>Warning</b>
              </h3>

              <button
                className="text-gray-400 hover:text-gray-600"
                onClick={() => setShowModal(false)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="m-4 flex justify-center">
              <b>Are you sure want to {status}</b>
            </div>
            {/* Modal Footer */}
            <div className="flex justify-end p-4 border-t gap-4">
              <button
                className="px-4 py-2 text-black border border-black rounded-lg hover:bg-blue-600 hover:text-white"
                onClick={() => setShowModal(false)}
              >
                Close
              </button>
              <button
                className="px-4 py-2 text-white bg-black rounded-lg hover:bg-blue-600"
                onClick={onSubmit}
              >
                Ok
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default OrderStateChangeModal;
