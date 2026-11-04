import { strict as assert } from "node:assert";
import { test } from "node:test";
import { buildEnquiryText, buildWhatsAppUrl, validateEnquiry } from "../../src/lib/enquiry.ts";
import { contactHref, isTopicSlug } from "../../src/content/topics.ts";

const ok = { name: "Test Person", phone: "+61 400 000 000", topic: "palm-reading", message: "" };

test("valid synthetic input passes", () => {
  assert.deepEqual(validateEnquiry(ok), {});
});

test("required fields and limits", () => {
  const e = validateEnquiry({ name: " ", phone: "", topic: "", message: "x".repeat(501) });
  assert.ok(e.name && e.phone && e.topic && e.message);
  assert.ok(validateEnquiry({ ...ok, name: "a".repeat(81) }).name);
});

test("phone formats", () => {
  for (const p of ["0400 000 000", "(02) 9000 0000", "+61 400-000-000", "+1 (555) 010 0000"]) {
    assert.equal(validateEnquiry({ ...ok, phone: p }).phone, undefined, p);
  }
  for (const p of ["1234", "abc 000 000", "04+00000000", "1".repeat(16)]) {
    assert.ok(validateEnquiry({ ...ok, phone: p }).phone, p);
  }
});

test("topic allowlist", () => {
  assert.ok(isTopicSlug("career-and-business"));
  assert.ok(!isTopicSlug("black-magic"));
  assert.ok(!isTopicSlug("<script>"));
  assert.ok(validateEnquiry({ ...ok, topic: "court-cases" }).topic);
  assert.equal(contactHref("palm-reading"), "/contact?topic=palm-reading#enquiry");
});

test("URL is encoded exactly once and round-trips", () => {
  const text = buildEnquiryText({ ...ok, topic: "palm-reading", message: "Is a phone session possible? 50% & more" });
  const url = buildWhatsAppUrl("61426562158", text);
  const parsed = new URL(url);
  assert.equal(parsed.origin + parsed.pathname, "https://wa.me/61426562158");
  assert.equal(parsed.searchParams.get("text"), text);
  assert.ok(!url.includes("%25") || text.includes("%"), "no double encoding");
  assert.ok(url.includes("%2050%25%20%26"), "special chars encoded once");
  assert.match(text, /Topic: Palm reading/);
  assert.match(text, /Best number to call me back: \+61 400 000 000/);
});
