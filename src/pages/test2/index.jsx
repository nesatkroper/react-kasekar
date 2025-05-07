import axios from "axios";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { apiKey } from "@/constants/api";
import { showToast } from "@/components/app/toast";

export default function LogExportButton() {
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async () => {
    setIsExporting(true);

    try {
      const response = await axios.get(`${apiKey}/log/exp`, {
        responseType: "blob",
      });

      // Create a download link and trigger it
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute(
        "download",
        `logs_export_${new Date().toISOString().split("T")[0]}.xlsx`
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
      onClick={handleExport}
      disabled={isExporting}
      className='gap-2'
      variant='default'>
      <Download className='h-4 w-4' />
      {isExporting ? "Exporting..." : "Export Logs to Excel"}
    </Button>
  );
}
