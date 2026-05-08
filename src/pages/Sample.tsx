import { PageHeader, PageHeaderHeading } from "@/shared/components/page-header";
import { Card, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card";

export default function Sample() {
    return (
        <>
            <PageHeader>
                <PageHeaderHeading>Sample Page</PageHeaderHeading>
            </PageHeader>
            <Card>
                <CardHeader>
                    <CardTitle>Card Title</CardTitle>
                    <CardDescription>Card description.</CardDescription>
                </CardHeader>
            </Card>
        </>
    )
}
