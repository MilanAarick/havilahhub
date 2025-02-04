"use client";

import React, { useCallback, useState, useRef } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
// import type PDFDocumentProxy  from "pdfjs-dist";
import { useResizeObserver } from "@wojtekmaj/react-hooks";
import { useRouter } from "next/navigation";

type Props = {
  selectedFile: string | null;
};
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const resizeObserverOptions = {};
const maxWidth = 800;

const ViewPdf = ({ selectedFile }: Props) => {
  const [numPages, setNumPages] = useState<number>();
  const [containerRef, setContainerRef] = useState<HTMLElement | null>(null);
  const [containerWidth, setContainerWidth] = useState<number>();

  // Refs for tracking
  const pageRefsMap = useRef<Map<number, HTMLDivElement>>(new Map());

  // Resize observer
  const onResize = useCallback<ResizeObserverCallback>((entries) => {
    const [entry] = entries;
    if (entry) {
      setContainerWidth(entry.contentRect.width);
    }
  }, []);

  useResizeObserver(containerRef, resizeObserverOptions, onResize);

  // Document load success handler
  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
  }

  // Page ref handler
  const setPageRef = useCallback(
    (pageNumber: number, element: HTMLDivElement | null) => {
      if (element) {
        pageRefsMap.current.set(pageNumber, element);
      } else {
        pageRefsMap.current.delete(pageNumber);
      }
    },
    []
  );

  return (
    <div className="flex justify-center items-center p-4">
      <div className="w-full max-w-4xl">
        <div className="flex justify-center" ref={setContainerRef}>
          <Document
            file={selectedFile}
            onLoadSuccess={onDocumentLoadSuccess}
            className="max-w-full"
          >
            {Array.from(new Array(numPages), (_el, index) => (
              <div
                key={`page_container_${index + 1}`}
                ref={(el) => setPageRef(index + 1, el)}
                data-page-number={index + 1}
                className="flex justify-center mb-4"
              >
                <Page
                  pageNumber={index + 1}
                  width={
                    containerWidth
                      ? Math.min(containerWidth, maxWidth)
                      : maxWidth
                  }
                  className="shadow-lg"
                />
              </div>
            ))}
          </Document>
        </div>
      </div>
    </div>
  );
};

export default ViewPdf;
