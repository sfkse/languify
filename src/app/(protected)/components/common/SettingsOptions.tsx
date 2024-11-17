import {
  Select,
  SelectItem,
  SelectContent,
  SelectValue,
  SelectTrigger,
} from "../ui/select";
import { Button } from "../ui/button";
import LevelSlider from "./LevelSlider";

const SettingsOptions = () => {
  return (
    <form>
      <LevelSlider />
      <div className="flex flex-row justify-between items-center gap-10 mt-10">
        <span className="w-40">Source language</span>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Select a language" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="en">English</SelectItem>
            <SelectItem value="fr">French</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-row justify-between items-center gap-10 mt-5">
        <span className="w-40">Target language </span>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Select a language" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="en">English</SelectItem>
            <SelectItem value="fr">French</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Button variant="default" className="w-full mt-10">
        Save
      </Button>
    </form>
  );
};

export default SettingsOptions;

