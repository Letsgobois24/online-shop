import Icon, { IconName } from "../Elements/Icon";

type ToasterConfig = {
  icon: IconName;
  iconColor: string;
  barColor: string;
  bgColor: string;
};

type ToasterVariant = {
  success: ToasterConfig;
  danger: ToasterConfig;
  warning: ToasterConfig;
};

export type VariantsType = "success" | "danger" | "warning";

export type ToasterProps = {
  variant: VariantsType;
  message: string;
  onClose: () => void;
};

const toasterVariant: ToasterVariant = {
  success: {
    icon: "circleCheck",
    iconColor: "text-green-500",
    barColor: "bg-green-500",
    bgColor: "bg-green-100",
  },
  danger: {
    icon: "circleCross",
    iconColor: "text-red-500",
    barColor: "bg-red-500",
    bgColor: "bg-red-100",
  },
  warning: {
    icon: "circleExclamation",
    iconColor: "text-orange-500",
    barColor: "bg-orange-500",
    bgColor: "bg-orange-100",
  },
};

const Toaster = ({ variant = "danger", message, onClose }: ToasterProps) => {
  const v = toasterVariant[variant];

  return (
    <div className="fixed z-50 bottom-3 right-3 shadow-md border border-gray-300 max-w-xs w-full rounded-lg overflow-hidden">
      <div
        id="toast-success"
        className="flex items-center w-full p-3 text-gray-600 bg-white rounded-lg"
        role="alert"
      >
        <div
          className={`${v.iconColor} ${v.bgColor} inline-flex items-center justify-center shrink-0 w-8 h-8 rounded-lg`}
        >
          <Icon icon={v.icon} size={20} />
        </div>
        <div className="ms-3 text-sm font-normal">{message}</div>
        <button
          onClick={onClose}
          type="button"
          className="cursor-pointer ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8"
        >
          <Icon icon="cross" size={12} />
        </button>
      </div>

      <div className={`${v.bgColor} flex h-0.5 bg-green-100`}>
        <div className={`${v.barColor} bg-green-500 animate-shrink`}></div>
      </div>
    </div>
  );
};

export default Toaster;
