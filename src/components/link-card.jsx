import { Link } from "react-router-dom";
import moment from "moment";
import { Button } from "./ui/button";
import { CopyIcon, DownloadIcon, Loader, TrashIcon } from "lucide-react";
import { toast } from "./ui/use-toast";
import useFetch from "@/lib/useFetch";
import { deleteUrls } from "@/utils/apiUrls";
import baseUrl from "@/app-layout/base-url";
import { QRCode } from "react-qrcode-logo";

const LinkCard = function ({ data, fetchUrl }) {
  const { loading, fn: deleteFn, error } = useFetch(deleteUrls, data?.id);

  return (
    <div className="flex flex-col md:flex-row gap-5 border p-4 bg-gray-900 mt-2 rounded-lg">
      <div>
        <QRCode value={`${baseUrl}${data.short_url}`} />
      </div>
      <Link to={`/link/${data?.id}`} className="flex flex-col flex-1">
        <span className="text-3xl hover:underline cursor-poiner font-extrabold">
          {data.title}
        </span>
        <span className="text-2xl text-blue-400 font-bold hover:underline cursor-pointer">
          {baseUrl}/{data?.custom_url ? data?.custom_url : data?.short_url}
        </span>
        <span className="flex items-center gap-1 hover:underline cursor-pointer truncate">
          {data?.original_url}
        </span>
        <span className="font-extralight text-sm mt-auto ">
          {moment(data?.created_at).format("DD-MM-YYYY")}
        </span>
      </Link>
      <div>
        <Button
          onClick={() => {
            navigator.clipboard.writeText(`${baseUrl}/${data.short_url}`);
            toast({
              title: <p className="text text-green-400">Copied to Clipboard</p>,
            });
          }}
          variant="ghost"
        >
          <CopyIcon />
        </Button>
        <Button variant="ghost">
          <DownloadIcon />
        </Button>
        <Button variant="ghost">
          {loading && <Loader className="animate animate-spin mr-2" />}
          <TrashIcon onClick={() => deleteFn().then(() => fetchUrl())} />
        </Button>
      </div>
    </div>
  );
};

export default LinkCard;
