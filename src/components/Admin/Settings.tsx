
  import {  useContext } from "react";
  import { ThemeContext } from "../../context/ThemeContext";

  const Settings = () => {
    const {
    theme,
    } = useContext(ThemeContext);
  

    return (

      <div className="p-6 space-y-6 bg-white dark:bg-gray-900 rounded shadow">
        <h2 className="text-2xl font-bold">Theme Settings</h2>
  
        <div>
          <label className="block font-medium mb-1">Theme Mode</label>
          <select
            value={theme}
          //  onChange={(e) => setSettings({ mode: e.target.value as "light" | "dark" })}
            className="p-2 border rounded w-full"
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </div>
  
        <div>
          <label className="block font-medium mb-1">Primary Color</label>
          <input
            type="color"
           // value={primaryColor}
            //onChange={(e) => setSettings({ primaryColor: e.target.value })}
            className="w-16 h-10 border rounded"
          />
        </div>
  
        <div>
          <label className="block font-medium mb-1">Button Shape</label>
          <select
           // value={buttonShape}
           // onChange={(e) => setSettings({ buttonShape: e.target.value as "rounded" | "square" })}
            className="p-2 border rounded w-full"
          >
            <option value="rounded">Rounded</option>
            <option value="square">Square</option>
          </select>
        </div>
  
        <div>
          <label className="block font-medium mb-1">Icon Style</label>
          <select
           // value={iconStyle}
            //onChange={(e) => setSettings({ iconStyle: e.target.value as "outline" | "solid" })}
            className="p-2 border rounded w-full"
          >
            <option value="outline">Outline</option>
            <option value="solid">Solid</option>
          </select>
        </div>
      </div>
    );
  };
  
  export default Settings;