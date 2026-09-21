import React, { useCallback, useRef, useState } from "react";

import {
  FiUploadCloud,
  FiFileText,
  FiTrash2,
  FiX,
  FiDownload,
  FiScissors,
  FiLayers,
  FiRefreshCw,
  FiCheckCircle,
  FiAlertCircle,
  FiPlus,
} from "react-icons/fi";

export default function PdfMergeSplit() {
  const inputRef = useRef(null);

  const [files, setFiles] = useState([]);
  const [activeTab, setActiveTab] = useState("merge");
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [message, setMessage] = useState(null);

  // Show temporary message
  const showMessage = (type, text) => {
    setMessage({ type, text });

    window.setTimeout(() => {
      setMessage(null);
    }, 4000);
  };

  // Format file size
  const formatBytes = (bytes) => {
    if (!bytes) return "0 KB";

    const units = ["Bytes", "KB", "MB", "GB"];
    const index = Math.min(
      Math.floor(Math.log(bytes) / Math.log(1024)),
      units.length - 1,
    );

    return `${(bytes / Math.pow(1024, index)).toFixed(
      index === 0 ? 0 : 2,
    )} ${units[index]}`;
  };

  // Check PDF
  const isPdf = (file) => {
    return (
      file.type === "application/pdf" ||
      file.name.toLowerCase().endsWith(".pdf")
    );
  };

  // Get PDF page count
  const getPageCount = async (file) => {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await PDFDocument.load(arrayBuffer);
    return pdf.getPageCount();
  };

  // Add files
  const addFiles = useCallback(
    async (selectedFiles) => {
      const incoming = Array.from(selectedFiles || []);

      if (!incoming.length) return;

      const pdfFiles = incoming.filter(isPdf);

      if (!pdfFiles.length) {
        showMessage("error", "Please select valid PDF files.");
        return;
      }

      if (pdfFiles.length !== incoming.length) {
        showMessage(
          "error",
          "Some files were skipped because they are not PDF files.",
        );
      }

      setIsProcessing(true);

      try {
        // Split mode only accepts one file
        const filesToProcess =
          activeTab === "split" ? pdfFiles.slice(0, 1) : pdfFiles;

        const preparedFiles = await Promise.all(
          filesToProcess.map(async (file) => {
            const pages = await getPageCount(file);

            return {
              id: `${file.name}-${file.size}-${file.lastModified}-${Math.random()}`,
              file,
              name: file.name,
              size: file.size,
              pages,
            };
          }),
        );

        if (activeTab === "split") {
          setFiles(preparedFiles);
        } else {
          setFiles((previous) => [...previous, ...preparedFiles]);
        }
      } catch (error) {
        console.error("PDF read error:", error);
        showMessage("error", "One or more PDF files could not be read.");
      } finally {
        setIsProcessing(false);
      }
    },
    [activeTab],
  );

  // File input
  const handleFileChange = async (event) => {
    await addFiles(event.target.files);

    // Allow selecting the same file again
    event.target.value = "";
  };

  // Drag over
  const handleDragOver = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(true);
  };

  // Drag leave
  const handleDragLeave = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);
  };

  // Drop
  const handleDrop = async (event) => {
    event.preventDefault();
    event.stopPropagation();

    setIsDragging(false);

    await addFiles(event.dataTransfer.files);
  };

  // Remove file
  const removeFile = (id) => {
    setFiles((previous) => previous.filter((item) => item.id !== id));
  };

  // Clear files
  const clearFiles = () => {
    setFiles([]);
    setMessage(null);
  };

  // Move file
  const moveFile = (index, direction) => {
    setFiles((previous) => {
      const updated = [...previous];
      const newIndex = index + direction;

      if (newIndex < 0 || newIndex >= updated.length) {
        return previous;
      }

      [updated[index], updated[newIndex]] = [updated[newIndex], updated[index]];

      return updated;
    });
  };

  // Download blob
  const downloadBlob = (blob, filename) => {
    const url = URL.createObjectURL(blob);

    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = filename;

    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();

    window.setTimeout(() => {
      URL.revokeObjectURL(url);
    }, 1000);
  };

  // Merge PDFs
  const mergePdfs = async () => {
    if (files.length < 2) {
      showMessage("error", "Please add at least 2 PDF files to merge.");
      return;
    }

    setIsProcessing(true);
    setMessage(null);

    try {
      const mergedPdf = await PDFDocument.create();

      for (const item of files) {
        const bytes = await item.file.arrayBuffer();

        const sourcePdf = await PDFDocument.load(bytes);

        const pages = await mergedPdf.copyPages(
          sourcePdf,
          sourcePdf.getPageIndices(),
        );

        pages.forEach((page) => {
          mergedPdf.addPage(page);
        });
      }

      const mergedBytes = await mergedPdf.save();

      const blob = new Blob([mergedBytes], {
        type: "application/pdf",
      });

      downloadBlob(blob, "merged-document.pdf");

      showMessage("success", "PDF files merged successfully.");
    } catch (error) {
      console.error("Merge error:", error);

      showMessage("error", "Unable to merge the selected PDF files.");
    } finally {
      setIsProcessing(false);
    }
  };

  // Split PDF
  const splitPdf = async () => {
    if (files.length !== 1) {
      showMessage("error", "Please select exactly one PDF to split.");
      return;
    }

    setIsProcessing(true);
    setMessage(null);

    try {
      const item = files[0];

      const bytes = await item.file.arrayBuffer();

      const sourcePdf = await PDFDocument.load(bytes);

      const zip = new JSZip();

      const baseName =
        item.name
          .replace(/\.pdf$/i, "")
          .replace(/[^\w\- ]+/g, "")
          .trim() || "document";

      const pageCount = sourcePdf.getPageCount();

      for (let pageIndex = 0; pageIndex < pageCount; pageIndex++) {
        const singlePagePdf = await PDFDocument.create();

        const [page] = await singlePagePdf.copyPages(sourcePdf, [pageIndex]);

        singlePagePdf.addPage(page);

        const pdfBytes = await singlePagePdf.save();

        zip.file(`${baseName}-page-${pageIndex + 1}.pdf`, pdfBytes);
      }

      const zipBlob = await zip.generateAsync({
        type: "blob",
      });

      downloadBlob(zipBlob, `${baseName}-split-pages.zip`);

      showMessage("success", `${pageCount} pages split successfully.`);
    } catch (error) {
      console.error("Split error:", error);

      showMessage("error", "Unable to split this PDF.");
    } finally {
      setIsProcessing(false);
    }
  };

  // Change tab
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setMessage(null);
    setFiles([]);

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const totalPages = files.reduce((total, item) => total + item.pages, 0);

  return (
    <section className="w-full bg-black01 px-3 py-8 sm:px-5 sm:py-10 md:px-8 lg:px-10 xl:px-12">
      <div className="mx-auto w-full max-w-6xl">
        {/* Header */}
        <div className="mb-6 text-center sm:mb-8">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-orange/30 bg-orange/10 px-3 py-1.5 text-xs font-medium text-orange sm:text-sm">
            <FiFileText size={15} />
            PDF Utility
          </div>

          <h1 className="font-montserrat text-2xl font-bold leading-tight text-white sm:text-3xl md:text-4xl lg:text-5xl">
            PDF Merge / Split
          </h1>

          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-white02 sm:text-base">
            Merge multiple PDF files into one document or split a PDF into
            individual pages directly in your browser.
          </p>
        </div>

        {/* Main Card */}
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-black02 shadow-2xl">
          {/* Tabs */}
          <div className="border-b border-white/10 p-3 sm:p-4">
            <div className="grid grid-cols-2 gap-2 rounded-xl bg-black01 p-1">
              <button
                type="button"
                onClick={() => handleTabChange("merge")}
                className={`flex min-h-11 items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold transition-all duration-200 sm:text-base ${
                  activeTab === "merge"
                    ? "bg-orange text-white shadow-lg"
                    : "text-white02 hover:bg-white/5 hover:text-white"
                }`}
              >
                <FiLayers size={18} />
                <span>Merge PDF</span>
              </button>

              <button
                type="button"
                onClick={() => handleTabChange("split")}
                className={`flex min-h-11 items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold transition-all duration-200 sm:text-base ${
                  activeTab === "split"
                    ? "bg-orange text-white shadow-lg"
                    : "text-white02 hover:bg-white/5 hover:text-white"
                }`}
              >
                <FiScissors size={18} />
                <span>Split PDF</span>
              </button>
            </div>
          </div>

          <div className="p-3 sm:p-5 md:p-6 lg:p-8">
            {/* Dropzone */}
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`group relative rounded-2xl border-2 border-dashed p-5 text-center transition-all duration-200 sm:p-8 md:p-10 ${
                isDragging
                  ? "border-orange bg-orange/10"
                  : "border-white/15 bg-black01 hover:border-orange/50 hover:bg-orange/5"
              }`}
            >
              <input
                ref={inputRef}
                type="file"
                accept="application/pdf,.pdf"
                multiple={activeTab === "merge"}
                onChange={handleFileChange}
                className="hidden"
              />

              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-orange/20 bg-orange/10 text-orange sm:h-16 sm:w-16">
                <FiUploadCloud size={28} />
              </div>

              <h2 className="mt-4 font-montserrat text-lg font-semibold text-white sm:text-xl">
                {isDragging
                  ? "Drop your PDF here"
                  : activeTab === "merge"
                    ? "Upload PDF files"
                    : "Upload a PDF file"}
              </h2>

              <p className="mx-auto mt-2 max-w-lg text-xs leading-5 text-white02 sm:text-sm">
                {activeTab === "merge"
                  ? "Drag and drop multiple PDF files here, or select files from your device."
                  : "Select one PDF file and we will split every page into a separate PDF."}
              </p>

              <button
                type="button"
                onClick={() => inputRef.current?.click()}
                className="btn-primary mt-5 w-full sm:w-auto"
                disabled={isProcessing}
              >
                <FiPlus size={18} />
                Choose PDF{activeTab === "merge" ? "s" : ""}
              </button>

              <p className="mt-3 text-[11px] text-white02/70 sm:text-xs">
                PDF files only • Processing happens locally
              </p>
            </div>

            {/* Message */}
            {message && (
              <div
                className={`mt-5 flex items-start gap-3 rounded-xl border p-3 text-sm ${
                  message.type === "success"
                    ? "border-green-500/20 bg-green-500/10 text-green-300"
                    : "border-red-500/20 bg-red-500/10 text-red-300"
                }`}
              >
                {message.type === "success" ? (
                  <FiCheckCircle className="mt-0.5 shrink-0" size={18} />
                ) : (
                  <FiAlertCircle className="mt-0.5 shrink-0" size={18} />
                )}

                <span className="leading-5">{message.text}</span>

                <button
                  type="button"
                  onClick={() => setMessage(null)}
                  className="ml-auto shrink-0 text-current opacity-70 transition hover:opacity-100"
                  aria-label="Close message"
                >
                  <FiX size={17} />
                </button>
              </div>
            )}

            {/* Files */}
            {files.length > 0 && (
              <div className="mt-6">
                <div className="mb-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h3 className="font-montserrat text-base font-semibold text-white sm:text-lg">
                      Selected files
                    </h3>

                    <p className="mt-1 text-xs text-white02 sm:text-sm">
                      {files.length} {files.length === 1 ? "file" : "files"} •{" "}
                      {totalPages} {totalPages === 1 ? "page" : "pages"}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={clearFiles}
                    className="inline-flex min-h-10 items-center justify-center gap-2 self-start rounded-lg border border-white/10 px-3 py-2 text-xs font-medium text-white02 transition hover:border-red-400/30 hover:bg-red-400/10 hover:text-red-300 sm:self-auto sm:text-sm"
                  >
                    <FiRefreshCw size={15} />
                    Clear all
                  </button>
                </div>

                {/* File List */}
                <div className="space-y-2">
                  {files.map((item, index) => (
                    <div
                      key={item.id}
                      className="group flex flex-col gap-3 rounded-xl border border-white/10 bg-black01 p-3 transition hover:border-orange/30 sm:flex-row sm:items-center sm:p-4"
                    >
                      <div className="flex min-w-0 flex-1 items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-orange/10 text-orange sm:h-11 sm:w-11">
                          <FiFileText size={20} />
                        </div>

                        <div className="min-w-0">
                          <p
                            className="truncate text-sm font-medium text-white sm:text-base"
                            title={item.name}
                          >
                            {item.name}
                          </p>

                          <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] text-white02 sm:text-xs">
                            <span>{formatBytes(item.size)}</span>

                            <span className="text-white02/40">•</span>

                            <span>
                              {item.pages} {item.pages === 1 ? "page" : "pages"}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* File Actions */}
                      <div className="flex items-center justify-between gap-1 border-t border-white/5 pt-2 sm:justify-end sm:border-0 sm:pt-0">
                        {activeTab === "merge" && (
                          <div className="flex items-center">
                            <button
                              type="button"
                              onClick={() => moveFile(index, -1)}
                              disabled={index === 0}
                              className="flex h-8 w-8 items-center justify-center rounded-md text-white02 transition hover:bg-white/5 hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
                              aria-label="Move file up"
                            >
                              ↑
                            </button>

                            <button
                              type="button"
                              onClick={() => moveFile(index, 1)}
                              disabled={index === files.length - 1}
                              className="flex h-8 w-8 items-center justify-center rounded-md text-white02 transition hover:bg-white/5 hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
                              aria-label="Move file down"
                            >
                              ↓
                            </button>
                          </div>
                        )}

                        <button
                          type="button"
                          onClick={() => removeFile(item.id)}
                          className="flex h-9 w-9 items-center justify-center rounded-lg text-white02 transition hover:bg-red-500/10 hover:text-red-400"
                          aria-label={`Remove ${item.name}`}
                        >
                          <FiTrash2 size={17} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Action */}
                <div className="mt-5 rounded-xl border border-orange/10 bg-orange/5 p-3 sm:p-4">
                  {activeTab === "merge" ? (
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <p className="text-sm font-medium text-white">
                          Ready to merge
                        </p>

                        <p className="mt-1 text-xs leading-5 text-white02">
                          Files will be merged in the order shown above.
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={mergePdfs}
                        disabled={isProcessing || files.length < 2}
                        className="btn-primary w-full sm:w-auto"
                      >
                        {isProcessing ? (
                          <>
                            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                            Processing...
                          </>
                        ) : (
                          <>
                            <FiDownload size={18} />
                            Merge & Download
                          </>
                        )}
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <p className="text-sm font-medium text-white">
                          Ready to split
                        </p>

                        <p className="mt-1 text-xs leading-5 text-white02">
                          Each page will become a separate PDF inside a ZIP
                          file.
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={splitPdf}
                        disabled={isProcessing || files.length !== 1}
                        className="btn-primary w-full sm:w-auto"
                      >
                        {isProcessing ? (
                          <>
                            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                            Processing...
                          </>
                        ) : (
                          <>
                            <FiScissors size={18} />
                            Split & Download
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Empty State */}
            {files.length === 0 && (
              <div className="mt-6 rounded-xl border border-white/5 bg-black01 p-4 text-center sm:p-5">
                <p className="text-xs leading-5 text-white02 sm:text-sm">
                  {activeTab === "merge"
                    ? "Add at least two PDF files to start merging."
                    : "Add one PDF file to split it into individual pages."}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Privacy */}
        <div className="mx-auto mt-5 flex max-w-2xl items-start gap-2 text-center text-[11px] leading-5 text-white02/70 sm:text-xs">
          <FiCheckCircle className="mt-0.5 shrink-0 text-orange" />

          <p>
            Your PDF files are processed directly in your browser. No PDF data
            needs to be uploaded to a server.
          </p>
        </div>
      </div>
    </section>
  );
}
