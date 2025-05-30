import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
  pdfFile: z.any()
    .refine(files => files?.length >= 1, "PDFファイルを選択してください。")
    .refine(files => files?.[0]?.type === "application/pdf", "PDFファイルのみアップロードできます。"),
});

type FormValues = z.infer<typeof formSchema>;

export function CreatePdfStrengthButton() {
  const [open, setOpen] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(values: FormValues) {
    const formData = new FormData();
    formData.append('pdfFile', values.pdfFile[0]);

    try {
      const response = await fetch('/api/pdf_strengths/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Upload successful:', result);
        alert('PDFアップロードに成功しました！');
        setOpen(false);
      } else {
        const errorData: any = await response.json();
        console.error('Upload failed:', response.status, errorData);
        alert(`PDFアップロードに失敗しました: ${errorData.message || response.statusText}`);
      }
    } catch (error) {
      console.error('Network error during upload:', error);
      alert('アップロード中にネットワークエラーが発生しました。');
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Create New PDF Strength
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Upload PDF for Strength Analysis</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 py-4">
            <FormField
              control={form.control}
              name="pdfFile"
              render={({ field: { value, onChange, ...fieldProps } }) => (
                <FormItem>
                  <FormLabel>PDF File</FormLabel>
                  <FormControl>
                    <Input
                      {...fieldProps}
                      type="file"
                      accept="application/pdf"
                      onChange={event => onChange(event.target.files)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Upload and Analyze</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
} 