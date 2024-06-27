import useFetch from "@/lib/useFetch";
import { getStats, getUrlsById } from "@/utils/apiUrls";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import moment from "moment";
import { Button } from "@/components/ui/button";
import { CopyIcon, DownloadIcon, LinkIcon, TrashIcon } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import MainLoader from "@/components/Loader";
import LocationStrat from "@/components/location-strat";
import DeviceStrat from "@/components/device-strat";
import baseUrl from "@/app-layout/base-url";
import { QRCode } from "react-qrcode-logo";

const Link = function () {
  const { id } = useParams();
  const {
    loading: urlLoading,
    error,
    data,
    fn: getUrl,
  } = useFetch(getUrlsById, id);

  const {
    loading: stratLoading,
    error: startError,
    data: sd,
    fn: getStart,
  } = useFetch(getStats, id);

  useEffect(() => {
    getUrl();
    getStart();
  }, []);

  if (error || startError) {
    return (
      <div>
        <Error>{error.message}</Error>
        <Error>{startError.message}</Error>
      </div>
    );
  }

  if (urlLoading && stratLoading) {
    return <MainLoader />;
  }

  return (
    <div className="grid grid-cols-1 h-screen gap-8 sm:grid-cols-2">
      <div>
        <Card className="flex flex-col gap-3 ">
          <CardHeader>
            <CardTitle className="text-4xl text-extrabold">
              {data?.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div>
              <Button
                onClick={() => {
                  navigator.clipboard.writeText(`${baseUrl}/${data.short_url}`);
                  toast({
                    title: (
                      <p className="text text-green-400">Copied to Clipboard</p>
                    ),
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
                <TrashIcon />
              </Button>
            </div>
            <div className="flex flex-col flex-1">
              <span className="text-2xl text-blue-400 font-bold hover:underline cursor-pointer">
                {baseUrl}/
                {data?.custom_url ? data?.custom_url : data?.short_url}
              </span>
              <span className="flex items-center gap-1 hover:underline cursor-pointer py-3 truncate">
                <LinkIcon />
                {data?.original_url}
              </span>
              <span className="font-extralight text-sm mt-auto ">
                Created At: {moment(data?.created_at).format("DD-MM-YYYY")}
              </span>
            </div>
          </CardContent>
          <div className="flex justify-center items-center p-4">
            <QRCode value={`${baseUrl}${data?.short_url}`} />
          </div>
        </Card>
      </div>
      <div>
        <Card>
          <CardHeader>
            <CardTitle>Total Clicks</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{sd?.length}</p>
          </CardContent>
        </Card>
        <div className="flex flex-col md:flex-row">
          <LocationStrat data={sd} />
          <DeviceStrat data={sd} />
        </div>
      </div>
    </div>
  );
};

export default Link;
