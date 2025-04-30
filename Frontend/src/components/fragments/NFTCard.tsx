"use client";

import * as React from "react";
import { useState, useContext } from "react";
import { UrlContext } from "@/context/UrlContext";
import { imageplaceholder } from "@/asset";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ImageIcon } from "lucide-react";

export function CardWithForm() {
  const tokenAddresses = {
    lisk: "0x8a21CF9Ba08Ae709D64Cb25AfAA951183EC9FF6D",
    usdt: "0x2728DD8B45B788e26d12B13Db5A244e5403e7eda",
    usdc: "0x34b422de20051bDf8fcA23664C8265e70c0FCb21",
    dai: "0x0DB2a8Aa2E2C023Cfb61c617d40162cc9F4c27aB",
  };

  const [file, setFile] = useState<File>();
  const {
    url,
    setUrl,
    nftName,
    setNftName,
    nftSymbol,
    setNftSymbol,
    setSelectedToken,
  } = useContext(UrlContext);

  const [uploading, setUploading] = useState(false);

  const uploadFile = async () => {
    try {
      if (!file) {
        alert("No file selected");
        return;
      }

      setUploading(true);
      const data = new FormData();
      data.set("file", file);
      const uploadRequest = await fetch("/api/files", {
        method: "POST",
        body: data,
      });
      const ipfsUrl = await uploadRequest.json();
      console.log(ipfsUrl);
      setUrl(ipfsUrl);
      setUploading(false);
    } catch (e) {
      console.log(e);
      setUploading(false);
      alert("Trouble uploading file");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target?.files?.[0]);
  };

  const handleNftNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNftName(e.target.value);
  };

  const handleNftSymbolChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNftSymbol(e.target.value);
  };

  const handleTokenChange = (value: "lisk" | "usdt" | "usdc" | "dai") => {
    setSelectedToken(tokenAddresses[value]);
  };
  return (
    <div className="flex flex-col gap-4 w-full">
      <div>
        {
          url ?
          <Image
            src={url}
            alt="images"
            width={350}
            height={350}
            className="rounded-xl"
          />
          :
          <div className="w-full h-64 rounded-xl bg-white bg-opacity-10 flex justify-center items-center"><ImageIcon size={50}/></div>
        }
      </div>
      <div>
        <Card className="w-full bg-white bg-opacity-10 border-0">
          <CardHeader>
            <div className="flex flex-col gap-4">
              <div>
                <input type="file"  onChange={handleChange} />
              </div>
              <div>
                {" "}
                <button disabled={uploading} onClick={uploadFile}>
                  {uploading ? "Uploading..." : "Upload"}
                </button>
              </div>
            </div>
            <CardTitle>Create your NFT Ticket</CardTitle>
          </CardHeader>
          <CardContent>
            <form>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name">NFT Ticket Name</Label>
                  <Input
                    id="name"
                    placeholder="Name of your NFT Ticket"
                    className="border border-white border-opacity-30 h-10 placeholder:text-gray-300 rounded-xl"
                    value={nftName}
                    onChange={handleNftNameChange}
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name">NFT Ticket Symbol</Label>
                  <Input
                    id="name"
                    placeholder="Ticket Symbol"
                    className="border border-white border-opacity-30 h-10 placeholder:text-gray-300 rounded-xl"
                    value={nftSymbol}
                    onChange={handleNftSymbolChange}
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="framework">Payment Token</Label>
                  <Select onValueChange={handleTokenChange}
                  >
                    <SelectTrigger id="framework" className="border border-white border-opacity-30 h-10 placeholder:text-gray-300 rounded-xl">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                      <SelectItem value="lisk">LISK</SelectItem>
                      <SelectItem value="usdt">USDT</SelectItem>
                      <SelectItem value="usdc">USDC</SelectItem>
                      <SelectItem value="dai">DAI</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
