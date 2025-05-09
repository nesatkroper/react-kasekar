import axios from "axios";
import React, { useState } from "react";
import { Download } from "lucide-react";
import { apiKey } from "@/constants/api";
import { Button } from "@/components/ui/button";
import { showToast } from "@/components/app/toast";

export const ExportButton = ({ endpoint, filename, prop }) => {
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async () => {
    setIsExporting(true);

    try {
      const response = await axios.get(`${apiKey}${endpoint}`, {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute(
        "download",
        `${filename}_${new Date().toISOString().split("T")[0]}.xlsx`
      );
      document.body.appendChild(link);
      link.click();

      // Clean up
      link.parentNode?.removeChild(link);
      window.URL.revokeObjectURL(url);

      showToast("Export successful", "success", false);
    } catch (error) {
      console.error("Export failed:", error);
      showToast("Export failed", "error");
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <Button
    {...prop}
      onClick={handleExport}
      disabled={isExporting}
      variant='default'>
      <Download className='h-4 w-4' />
      {isExporting ? "Exporting..." : "Export Logs to Excel"}
    </Button>
  );
}
