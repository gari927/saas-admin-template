import type { APIRoute } from "astro";

export const post: APIRoute = async ({ request, locals }) => {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return new Response(
        JSON.stringify({ message: "No file uploaded" }),
        { status: 400, headers: { "Content-Type": "application/json" } },
      );
    }

    /** ← ここがポイント */
    const bucket = locals.runtime.env.R2_BUCKET;

    if (!bucket) {
      console.error("R2_BUCKET binding is missing");
      return new Response(
        JSON.stringify({ message: "R2_BUCKET binding is missing" }),
        { status: 500, headers: { "Content-Type": "application/json" } },
      );
    }

    const timestamp = Date.now();
    const key = `pdfs/${timestamp}_${file.name}`;

    await bucket.put(key, await file.arrayBuffer(), {
      httpMetadata: { contentType: file.type },
    });

    // TODO: D1 にレコード追加

    return new Response(
      JSON.stringify({ message: "File uploaded", key }),
      { status: 200, headers: { "Content-Type": "application/json" } },
    );
  } catch (err: unknown) {
    const error = err as Error;
    console.error("Upload endpoint error:", error);
    return new Response(
      JSON.stringify({ message: "Internal Server Error", error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
};
