import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { useSearchParams } from "react-router-dom";
import { Input } from "./ui/input";
import { Card } from "./ui/card";
import { useContext, useRef, useState } from "react";
import { QRCode } from "react-qrcode-logo";
import { User } from "@/context/UserContext";
import { createUrl } from "@/utils/apiUrls";
import Error from "./error";
import { Loader } from "lucide-react";
import { toast } from "./ui/use-toast";

const CreateNew = function ({ fetchUrl }) {
  const [searchParam, setSearchParams] = useSearchParams();
  const createNew = searchParam.get("createNew");
  const { user } = useContext(User);
  const [formData, setFormData] = useState({ long_url: createNew || "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const ref = useRef();

  const handleInput = function (e) {
    setSearchParams({});
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Dialog defaultOpen={createNew}>
      <DialogTrigger>
        <Button>Create New</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New !</DialogTitle>
        </DialogHeader>
        {formData?.long_url && (
          <div className="flex items-center justify-center">
            <QRCode value={formData?.long_url} size={150} ref={ref} />
          </div>
        )}
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            setError("");
            setLoading(true);
            try {
              const canvas = ref.current.canvasRef.current;
              const blob = await new Promise((resolve) =>
                canvas.toBlob(resolve)
              );
              await createUrl({ ...formData, user_id: user?.id }, blob);
            } catch (error) {
              setError(error.message);
            } finally {
              setLoading(false);
              await fetchUrl();
              toast({
                title: (
                  <p className="text text-green-500">Created Successfully</p>
                ),
              });
            }
          }}
          className="flex flex-col gap-4"
        >
          {error && <Error>{error}</Error>}
          <Input
            onChange={(e) => handleInput(e)}
            name="title"
            placeholder="Title"
            value={formData?.title}
            type="text"
            required
          />
          <Input
            onChange={(e) => handleInput(e)}
            name="long_url"
            placeholder="Enter your Long URL"
            value={formData?.long_url}
            type="text"
            required
          />
          <div className="flex items-center gap-3">
            <Card className="p-2">trimmr.in</Card> /
            <Input
              onChange={(e) => handleInput(e)}
              name="custom_url"
              value={formData?.custom_url}
              placeholder="Custom Url (Optional)"
              type="text"
            />
          </div>
          <DialogFooter>
            <Button disabled={loading} className="w-[100%]">
              {loading && <Loader className="animate animate-spin mr-2" />}
              Submit
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateNew;
