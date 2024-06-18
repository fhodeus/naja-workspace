import type { FunctionComponent } from 'react';
import { Helmet } from 'react-helmet-async';

interface IGenericMetaTag {
    tag: 'meta';
    name?: string;
    property?: string;
    content: string;
}

interface IStructuredDataTag {
    tag: 'script';
    type: 'application/ld+json';
    content: string;
}

interface ITitleTag {
    tag: 'title';
    content: string;
}

export type MetaTagsDescriptor = IGenericMetaTag | IStructuredDataTag | ITitleTag;

export interface IMetaProps {
    tags: Array<MetaTagsDescriptor | null>;
}

export const Meta: FunctionComponent<IMetaProps> = ({ tags }) => {
    return (
        <Helmet>
            {tags
                .filter((item): item is MetaTagsDescriptor => !!item)
                .map((tag) => {
                    switch (tag.tag) {
                        case 'meta':
                            if (tag.name) {
                                return (
                                    <meta key={tag.name} name={tag.name} content={tag.content} />
                                );
                            }
                            return (
                                <meta
                                    key={tag.property}
                                    property={tag.property}
                                    content={tag.content}
                                />
                            );
                        case 'script':
                            return (
                                <script key={tag.type} type={tag.type}>
                                    {tag.content}
                                </script>
                            );
                        case 'title':
                            return <title key={tag.tag}>{tag.content}</title>;
                    }
                })}
        </Helmet>
    );
};
